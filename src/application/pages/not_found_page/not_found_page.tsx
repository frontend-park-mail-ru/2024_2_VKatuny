import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';

export interface NotFoundPageProps {
  url: URL;
}

export class NotFoundPage extends Component {
  constructor({ url }: NotFoundPageProps) {
    super({ url });
  }

  render(): VirtualNodeSpec {
    return <div>{this.props.url.toString()} Not Found (404)</div>;
  }
}
