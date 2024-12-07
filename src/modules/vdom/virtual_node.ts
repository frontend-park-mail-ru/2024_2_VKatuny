import { VirtualDomRoot } from './virtual_dom_root';

export interface Tsx {
  type: ComponentClass | string;
  props: ({ [key: string]: unknown } & { key?: string }) | null;
  children?: Array<VirtualNodeSpec | string>;
}

export interface VirtualNodeSpec extends Tsx {
  key: string | null;
  root: VirtualDomRoot | null;
}

export interface VirtualNode {
  type: ComponentClass | string;
  props: { [key: string]: unknown } | null;
  children?: Array<VirtualNodeSpec | string>;
  key: string | null;
  state?: Component;
  renderedSpec?: VirtualNodeSpec;
  parent: VirtualNode | null;
  eventListeners?: Map<string, Array<{ (ev: Event): void }>>;
  root: VirtualDomRoot | null;
}

export interface NodeWithVirtualNode extends Node {
  virtualNode?: VirtualNode;
  subtreeVirtualNode?: VirtualNode;
}

export interface ComponentOptions {
  props?: { [key: string]: unknown };
  children?: Array<VirtualNodeSpec | string>;
}

export abstract class Component {
  public props?: { [key: string]: unknown };
  public children?: Array<VirtualNodeSpec | string>;
  public domNode?: NodeWithVirtualNode;

  constructor({ props, children }: ComponentOptions) {
    this.props = props;
    this.children = children;
  }

  didCreate() {}

  didMount() {}

  willUpdate({ props, children }: ComponentOptions) {
    this.props = props;
    this.children = children;
  }

  didUpdate() {}

  willDestroy() {}

  abstract render(): VirtualNodeSpec;
}

export type ComponentClass = { new (options: ComponentOptions): Component };
