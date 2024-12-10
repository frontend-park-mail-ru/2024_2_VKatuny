import type {
  ComponentClass,
  VirtualNode,
  VirtualNodeSpec,
  NodeWithVirtualNode,
} from './virtual_node';
import { setEventListener, unsetEventListeners, isEventProperty } from './virtual_dom_root';

export function createElement(
  type: ComponentClass | string,
  props: ({ [key: string]: unknown } & { key?: string; className?: string; class?: string }) | null,
  ...children: Array<VirtualNodeSpec | string | boolean>
): VirtualNodeSpec {
  let key: string = null;
  if (typeof props === 'object' && props !== null) {
    if (props.hasOwnProperty('key')) {
      key = props.key;
      delete props.key;
    }
    if (props.hasOwnProperty('className')) {
      props.class = props.className;
      delete props.className;
      const allClasses = props.class.split(' ');
      for (let i = 0; i < allClasses.length; i++) {
        const className = allClasses[i];
        // key is autogenerated according to BEM element class
        if (className.includes('__')) {
          key = className;
          break;
        }
      }
    }
  }

  return {
    type,
    props,
    children: fixChildren(children),
    key,
    root: null,
  };
}

function fixChildren(
  children: Array<VirtualNodeSpec | string | Array<VirtualNodeSpec | string> | boolean>,
): Array<VirtualNodeSpec | string> {
  return children
    .reduce((acc: Array<VirtualNodeSpec | string | boolean>, child) => {
      if (Array.isArray(child)) {
        return [...acc, ...fixChildren(child)];
      }
      return [...acc, child];
    }, [])
    .filter((child) => {
      return typeof child !== 'boolean';
    });
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export interface IntrinsicElements {
    [elemName: string]: unknown;
  }
  export type Element = VirtualNodeSpec;
  export interface ElementAttributesProperty {
    props: { [key: string]: unknown };
  }

  export interface ElementChildrenAttribute {
    children: Array<VirtualNodeSpec | string>;
  }
}

export function createNode(spec: VirtualNodeSpec | string): NodeWithVirtualNode {
  const isTextNode = typeof spec === 'string';
  if (isTextNode) {
    return document.createTextNode(spec);
  }

  const { type, props, children, key, root } = spec;
  const newVirtualNode: VirtualNode = {
    type,
    props,
    key,
    children,
    parent: null,
    root,
  };

  const isPlainHtmlElement = typeof type === 'string';
  if (isPlainHtmlElement) {
    const domNode: NodeWithVirtualNode & HTMLElement = document.createElement(type);
    domNode.virtualNode = newVirtualNode;

    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (isEventProperty(key)) {
          setEventListener(newVirtualNode, key, <{ (ev: Event): void }>value);
          return;
        }
        if (typeof value === 'boolean') {
          if (value) {
            domNode.setAttribute(key, '');
          }
          return;
        }
        if (value !== undefined) {
          domNode.setAttribute(key, <string>value);
        }
      });
    }

    if (children) {
      children.forEach((child) => {
        if (typeof child !== 'string') {
          child.root = newVirtualNode.root;
        }
        const domChild = createNode(child);
        if (domChild instanceof HTMLElement) {
          (domChild as NodeWithVirtualNode).virtualNode.parent = newVirtualNode;
        }
        domNode.appendChild(domChild);
        if (domChild.virtualNode && domChild.virtualNode.state) {
          domChild.virtualNode.state.didMount();
        }
      });
    }

    newVirtualNode.renderedSpec = spec;
    return domNode;
  }

  // We got a component

  newVirtualNode.state = new type(props, children);
  newVirtualNode.renderedSpec = newVirtualNode.state.render();
  newVirtualNode.renderedSpec.root = newVirtualNode.root;
  const domNode = createNode(newVirtualNode.renderedSpec);
  // domNode.virtualNode is a subtree of elements.
  // We should bind it to its origin element (its not quite parent)
  domNode.virtualNode.parent = newVirtualNode;
  domNode.subtreeVirtualNode = domNode.virtualNode;
  domNode.virtualNode = newVirtualNode;
  newVirtualNode.state.domNode = domNode;
  newVirtualNode.state.didCreate();

  return domNode;
}

export function updateNode(
  curHtml: NodeWithVirtualNode,
  newSpec: VirtualNodeSpec,
): NodeWithVirtualNode {
  // We assume that newSpec declares the same component as curNode
  // If we done right, not the same component will be sieved earlier
  const curNode = curHtml.virtualNode;
  const prevSpec = curNode.renderedSpec;

  const isComponentNode = typeof curNode.type !== 'string';
  if (isComponentNode) {
    curNode.state.willUpdate(newSpec.props, newSpec.children);
    const newRender = curNode.state.render();
    curNode.renderedSpec = newRender;
  } else {
    curNode.renderedSpec = newSpec;
  }

  // curHtml is guarantied to be HTMLElement since text HTML node is handled outside
  updateSelfProps(<HTMLElement>curHtml, prevSpec.props, curNode.renderedSpec.props);
  updateChildren(<HTMLElement>curHtml, prevSpec.children, curNode.renderedSpec.children);

  if (isComponentNode) {
    curNode.state.didUpdate();
  }

  return curHtml;
}

function updateChildren(
  curHtml: HTMLElement & NodeWithVirtualNode,
  prevChildren: Array<VirtualNodeSpec | string> = [],
  newChildren: Array<VirtualNodeSpec | string> = [],
) {
  const newChildrenCount = newChildren.length;

  for (
    let oldChildIdx = 0, newChildIdx = 0;
    newChildIdx < newChildrenCount;
    newChildIdx++, oldChildIdx++
  ) {
    const prevChild = prevChildren[oldChildIdx];
    const newChild = newChildren[newChildIdx];

    const isPrevChildText = typeof prevChild === 'string';
    const isNewChildText = typeof newChild === 'string';

    if (isPrevChildText && isNewChildText) {
      curHtml.childNodes[newChildIdx].textContent = <string>newChild;
    } else if (
      !isPrevChildText &&
      !isNewChildText &&
      prevChild &&
      prevChild.type === newChild.type &&
      prevChild.key === newChild.key
    ) {
      updateNode(curHtml.childNodes[newChildIdx], newChild);
    } else {
      // Delete old node and add new one
      if (typeof newChild !== 'string') {
        newChild.root = curHtml.virtualNode.root;
      }
      const newHtmlNode = createNode(newChild);
      newHtmlNode.virtualNode.parent = curHtml.subtreeVirtualNode || curHtml.virtualNode;
      curHtml.insertBefore(newHtmlNode, curHtml.childNodes[newChildIdx]);
      if (newHtmlNode.virtualNode && newHtmlNode.virtualNode.state) {
        newHtmlNode.virtualNode.state.didMount();
      }
      oldChildIdx--;
    }
  }

  const curChildrenCount = curHtml.childNodes.length;

  for (let i = newChildrenCount; i < curChildrenCount; i++) {
    destroyNode(curHtml.childNodes[newChildrenCount]);
    curHtml.removeChild(curHtml.childNodes[newChildrenCount]);
  }
}

function updateSelfProps(
  curHtml: HTMLElement & NodeWithVirtualNode,
  prevProps: object | null,
  newProps: object | null,
) {
  const virtualNode = curHtml.subtreeVirtualNode || curHtml.virtualNode;
  if (virtualNode.eventListeners) {
    virtualNode.eventListeners.forEach(
      (listeners: Array<{ (ev: Event): void }>, eventName: string) => {
        unsetEventListeners(virtualNode, eventName);
      },
    );
    delete virtualNode.eventListeners;
  }

  if (newProps) {
    Object.entries(newProps).forEach(([key, value]) => {
      if (isEventProperty(key)) {
        setEventListener(virtualNode, key, <{ (ev: Event): void }>value);
        return;
      }
      if (typeof value === 'boolean') {
        if (value) {
          curHtml.setAttribute(key, '');
        }
        return;
      }
      if (value !== undefined) {
        curHtml.setAttribute(key, <string>value);
      }
    });
  }

  if (prevProps) {
    Object.keys(prevProps).forEach((key) => {
      if (!newProps || !newProps.hasOwnProperty(key)) {
        curHtml.removeAttribute(key);
      }
    });
  }
}

export function destroyNode(domNode: NodeWithVirtualNode) {
  const virtualNode = domNode.virtualNode;

  if (virtualNode) {
    const isComponentNode = typeof virtualNode.type !== 'string';

    if (isComponentNode) {
      virtualNode.state.willDestroy();
    }

    if (virtualNode.eventListeners) {
      virtualNode.eventListeners.forEach((_, eventName: string) => {
        unsetEventListeners(virtualNode, eventName);
      });
      delete virtualNode.eventListeners;
    }

    if (domNode.subtreeVirtualNode && domNode.subtreeVirtualNode.eventListeners) {
      domNode.subtreeVirtualNode.eventListeners.forEach((_, eventName: string) => {
        unsetEventListeners(domNode.subtreeVirtualNode, eventName);
      });
      delete domNode.subtreeVirtualNode.eventListeners;
    }

    domNode.childNodes.forEach((child) => destroyNode(child));
  }
}
