import type { Tsx, NodeWithVirtualNode, VirtualNode } from './virtual_node';
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
  constructor(private domNode: HTMLElement & NodeWithVirtualNode) {
    this.eventListeners = new Map<string, (ev: Event) => void>();
    this.registeredEventsAmount = new Map<string, number>();
  }

  update(tsx: Tsx) {
    const newSpec = createElement(tsx.type, tsx.props, ...tsx.children);
    newSpec.root = this;
    updateNode(this.renderedNode, newSpec);
  }

  render(tsx: Tsx | string) {
    destroyNode(this.domNode);
    if (typeof tsx === 'string') {
      this.domNode.textContent = tsx;
      return;
    }
    const vDomSpec = createElement(tsx.type, tsx.props, ...tsx.children);
    vDomSpec.root = this;
    this.renderedNode = createNode(vDomSpec);
    this.domNode.appendChild(this.renderedNode);
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
