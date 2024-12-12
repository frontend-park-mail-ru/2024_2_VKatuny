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

  const newVirtualNode = createVirtualNode(spec);

  if (typeof newVirtualNode.type === 'string') {
    const domNode: NodeWithVirtualNode & HTMLElement = document.createElement(newVirtualNode.type);
    domNode.virtualNode = newVirtualNode;

    if (newVirtualNode.props) {
      Object.entries(newVirtualNode.props).forEach(([key, value]) => {
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

    if (newVirtualNode.children) {
      newVirtualNode.children.forEach((child) => {
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
          if (domChild.oldComponentVirtualNodes) {
            domChild.oldComponentVirtualNodes.forEach((vNode) => {
              vNode.state.didMount();
            });
          }
        }
      });
    }

    return domNode;
  }

  // We got a component

  if (newVirtualNode.renderedSpec.key === null) {
    newVirtualNode.renderedSpec.key = newVirtualNode.key;
  }
  const domNode = createNode(newVirtualNode.renderedSpec);
  // domNode.virtualNode is a subtree of elements.
  // We should bind it to its origin element (its not quite parent)
  domNode.virtualNode.parent = newVirtualNode;
  if (domNode.originalVirtualNode === undefined) {
    // Got first component virtual node in the row
    domNode.originalVirtualNode = domNode.virtualNode;
    domNode.virtualNode = newVirtualNode;
  } else {
    if (domNode.oldComponentVirtualNodes !== undefined) {
      domNode.oldComponentVirtualNodes.push(domNode.virtualNode);
    } else {
      domNode.oldComponentVirtualNodes = [domNode.virtualNode];
    }
    domNode.virtualNode = newVirtualNode;
  }
  newVirtualNode.state.domNode = domNode;
  newVirtualNode.state.didCreate();

  return domNode;
}

function createVirtualNode(spec: VirtualNodeSpec) {
  const newVirtualNode: VirtualNode = {
    type: spec.type,
    props: spec.props,
    key: spec.key,
    children: spec.children,
    parent: null,
    root: spec.root,
  };
  if (typeof newVirtualNode.type !== 'string') {
    newVirtualNode.state = new newVirtualNode.type(newVirtualNode.props, newVirtualNode.children);
    newVirtualNode.renderedSpec = newVirtualNode.state.render();
    newVirtualNode.renderedSpec.root = newVirtualNode.root;
  } else {
    newVirtualNode.renderedSpec = spec;
  }

  return newVirtualNode;
}

export function updateNode(
  curHtml: NodeWithVirtualNode,
  newSpec: VirtualNodeSpec,
): NodeWithVirtualNode {
  // We assume that newSpec declares the same component as curNode
  // If we done right, not the same component will be sieved earlier
  const curNode = curHtml.virtualNode;
  let prevSpec = curHtml.originalVirtualNode
    ? curHtml.originalVirtualNode.renderedSpec
    : curHtml.virtualNode.renderedSpec;
  let curSpec: VirtualNodeSpec;

  const isComponentNode = typeof curNode.type !== 'string';
  if (isComponentNode) {
    // We have to update each virtual node in component row and render this row
    // till the moment when render result gives us plain html virtual node spec.
    curNode.state.willUpdate(newSpec.props, newSpec.children);
    const newRender = curNode.state.render();
    curNode.renderedSpec = newRender;
    curSpec = updateComponentChain(curHtml, newRender);
    // Have to check if new rendered html virtual node has the same type
    // if not, we should just replace html
    if (curSpec.type !== curHtml.originalVirtualNode.type) {
      destroyVirtualNode(curHtml.originalVirtualNode);
      const newHtmlNode = createNode(curSpec);
      newHtmlNode.originalVirtualNode = newHtmlNode.virtualNode;
      newHtmlNode.oldComponentVirtualNodes = curHtml.oldComponentVirtualNodes;
      newHtmlNode.virtualNode = curNode;
      (curHtml.parentElement as HTMLElement).insertBefore(newHtmlNode, curHtml);
      // We are replacing dom node, so the states have to be updated with new domNode
      curHtml.virtualNode.state.domNode = newHtmlNode;
      curHtml.oldComponentVirtualNodes.forEach(
        (virtualNode) => (virtualNode.state.domNode = newHtmlNode),
      );
      curHtml.parentElement.removeChild(curHtml);
      return newHtmlNode;
    }
  } else {
    prevSpec = curNode.renderedSpec;
    curNode.renderedSpec = newSpec;
    curSpec = curNode.renderedSpec;
  }

  // curHtml is guarantied to be HTMLElement since text HTML node is handled outside
  // prev and new specs are guaranteed to be of the same plain html type
  updateSelfProps(<HTMLElement>curHtml, prevSpec.props, curSpec.props);
  updateChildren(<HTMLElement>curHtml, prevSpec.children, curSpec.children);

  if (isComponentNode) {
    curNode.state.didUpdate();
  }

  return curHtml;
}

function updateComponentChain(curHtml: NodeWithVirtualNode, firstRender: VirtualNodeSpec) {
  let newRender = firstRender;
  const oldComponentVirtualNodes =
    curHtml.oldComponentVirtualNodes !== undefined
      ? curHtml.oldComponentVirtualNodes.reverse()
      : [];
  const newOldComponentVirtualNodes = [];

  // Forward update loop
  let oldComponentIdx = 0;
  for (oldComponentIdx = 0; oldComponentIdx < oldComponentVirtualNodes.length; oldComponentIdx++) {
    const oldVirtualNode = oldComponentVirtualNodes[oldComponentIdx];
    if (oldVirtualNode.type !== newRender.type) {
      break;
    }
    oldVirtualNode.state.willUpdate(newRender.props, newRender.children);
    newRender = oldVirtualNode.state.render();
    oldVirtualNode.renderedSpec = newRender;
    newOldComponentVirtualNodes.push(oldVirtualNode);
  }
  // Now newOldComponentVirtualNodes contains updated component chain.
  // We have to delete remaining virtual nodes if chain was broken and
  // render more if there any chain pieces to add
  for (oldComponentIdx; oldComponentIdx < oldComponentVirtualNodes.length; oldComponentIdx++) {
    destroyVirtualNode(oldComponentVirtualNodes[oldComponentIdx]);
  }

  let lastChainPiece =
    newOldComponentVirtualNodes.length > 0
      ? newOldComponentVirtualNodes[newOldComponentVirtualNodes.length - 1]
      : curHtml.virtualNode;
  while (typeof newRender.type !== 'string') {
    // Got new component to render
    newRender.root = lastChainPiece.root;
    const newVirtualNode = createVirtualNode(newRender);
    newRender = newVirtualNode.renderedSpec;
    newVirtualNode.parent = lastChainPiece;
    lastChainPiece = newVirtualNode;
    newOldComponentVirtualNodes.push(newVirtualNode);
  }
  curHtml.oldComponentVirtualNodes = newOldComponentVirtualNodes.reverse();
  return newRender;
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
      if (!isNewChildText) {
        newChild.root = curHtml.virtualNode.root;
      }
      const newHtmlNode = createNode(newChild);
      if (newHtmlNode.virtualNode) {
        newHtmlNode.virtualNode.parent = curHtml.originalVirtualNode || curHtml.virtualNode;
      }
      curHtml.insertBefore(newHtmlNode, curHtml.childNodes[newChildIdx]);
      if (newHtmlNode.virtualNode && newHtmlNode.virtualNode.state) {
        newHtmlNode.virtualNode.state.didMount();
        if (newHtmlNode.oldComponentVirtualNodes) {
          newHtmlNode.oldComponentVirtualNodes.forEach((v) => v.state.didMount());
        }
      }
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
  const virtualNode = curHtml.originalVirtualNode || curHtml.virtualNode;
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

    destroyVirtualNode(virtualNode);
    if (isComponentNode) {
      if (domNode.oldComponentVirtualNodes) {
        domNode.oldComponentVirtualNodes.forEach((vNode) => {
          destroyVirtualNode(vNode);
        });
      }
      if (domNode.originalVirtualNode) {
        destroyVirtualNode(domNode.originalVirtualNode);
      }
    }

    domNode.childNodes.forEach((child) => destroyNode(child));
  }
}

function destroyVirtualNode(virtualNode: VirtualNode) {
  if (typeof virtualNode.type !== 'string') {
    virtualNode.state.willDestroy();
  }
  if (virtualNode.eventListeners) {
    virtualNode.eventListeners.forEach((_, eventName: string) => {
      unsetEventListeners(virtualNode, eventName);
    });
    delete virtualNode.eventListeners;
  }
}
