import type { Tsx, NodeWithVirtualNode, VirtualNode, VirtualNodeSpec } from './virtual_node';
import { createElement, createNode, updateNode, destroyNode } from './virtual_dom';

export function isEventProperty(propertyName: string): boolean {
  return (
    propertyName.startsWith('on') &&
    propertyName[2] !== undefined &&
    propertyName[2].toUpperCase() === propertyName[2]
  );
}

export class VirtualDomRoot {
  private eventListeners: Map<string, (ev: Event) => void>;
  private registeredEventsAmount: Map<string, number>;
  private renderedNode?: NodeWithVirtualNode;
  private previousSpec?: VirtualNodeSpec;
  constructor(private domNode: HTMLElement & NodeWithVirtualNode) {
    this.eventListeners = new Map<string, (ev: Event) => void>();
    this.registeredEventsAmount = new Map<string, number>();
  }

  update(tsx?: Tsx) {
    if (tsx === undefined) {
      if (this.previousSpec === undefined) {
        return;
      }
      this.renderedNode = updateNode(this.renderedNode, this.previousSpec);
      return;
    }
    const newSpec = createElement(tsx.type, tsx.props, ...tsx.children);
    newSpec.root = this;
    this.previousSpec = newSpec;
    this.renderedNode = updateNode(this.renderedNode, newSpec);
  }

  render(vDomSpec: VirtualNodeSpec | string) {
    this.domNode.childNodes.forEach((child) => {
      destroyNode(child);
      this.domNode.removeChild(child);
    });
    if (typeof vDomSpec === 'string') {
      this.domNode.textContent = vDomSpec;
      return;
    }
    vDomSpec.root = this;
    this.previousSpec = vDomSpec;
    this.renderedNode = createNode(vDomSpec);
    this.domNode.appendChild(this.renderedNode);
    if (vDomSpec.type !== 'string') {
      this.renderedNode.virtualNode.state.didMount();
      if (this.renderedNode.oldComponentVirtualNodes) {
        this.renderedNode.oldComponentVirtualNodes.forEach((vNode) => {
          vNode.state.didMount();
        });
      }
    }
  }

  registerEvent(eventName: string): void {
    if (this.eventListeners.has(eventName)) {
      this.registeredEventsAmount.set(eventName, this.registeredEventsAmount.get(eventName) + 1);
      return;
    }
    const eventHandler = (ev: Event) => {
      const targetNode = ev.target as NodeWithVirtualNode;
      if (targetNode.virtualNode === undefined) {
        return;
      }
      const virtualNode = targetNode.virtualNode;
      bubbleEvent(ev, virtualNode);
    };
    this.domNode.addEventListener(eventName, eventHandler);
    this.eventListeners.set(eventName, eventHandler);
    this.registeredEventsAmount.set(eventName, 1);
  }

  unregisterEvent(eventName: string): void {
    if (!this.eventListeners.has(eventName)) {
      return;
    }
    this.registeredEventsAmount.set(eventName, this.registeredEventsAmount.get(eventName) - 1);
    if (this.registeredEventsAmount.get(eventName) === 0) {
      this.registeredEventsAmount.delete(eventName);
      this.domNode.removeEventListener(eventName, this.eventListeners.get(eventName));
      this.eventListeners.delete(eventName);
    }
  }
}

function bubbleEvent(event: Event, targetNode: VirtualNode): void {
  let currentTarget = targetNode;
  while (currentTarget !== null) {
    if (
      currentTarget.eventListeners !== undefined &&
      currentTarget.eventListeners.has(event.type)
    ) {
      currentTarget.eventListeners.get(event.type).forEach((handler) => handler(event));
    }
    currentTarget = currentTarget.parent;
  }
}

export function setEventListener(
  virtualNode: VirtualNode,
  eventKey: string,
  handler: (ev: Event) => void,
) {
  if (!virtualNode.root) {
    console.log('Unexpected no root');
    return;
  }
  if (!handler) {
    return;
  }
  const eventName = eventKey.slice(2).toLowerCase();
  if (!virtualNode.eventListeners) {
    virtualNode.eventListeners = new Map<string, Array<{ (ev: Event): void }>>();
  }
  if (virtualNode.eventListeners.has(eventName)) {
    virtualNode.eventListeners.get(eventName).push(handler);
  } else {
    virtualNode.eventListeners.set(eventName, [handler]);
  }
  virtualNode.root.registerEvent(eventName);
}

export function unsetEventListeners(virtualNode: VirtualNode, eventName: string) {
  if (virtualNode.eventListeners.has(eventName)) {
    const listenersAmount = virtualNode.eventListeners.get(eventName).length;
    virtualNode.eventListeners.delete(eventName);
    for (let i = 0; i < listenersAmount; i++) {
      virtualNode.root.unregisterEvent(eventName);
    }
  }
}
