import * as vdom from '@/modules/vdom/virtual_dom';
import { Component } from '@/modules/vdom/virtual_node';
import { VirtualNodeSpec } from '@/modules/vdom/virtual_node';

export interface DropdownProps {
  elementClass: string;
}

export class Dropdown extends Component {
  private dropdownOpen: boolean = false;
  constructor({ elementClass }: DropdownProps, children?: Array<VirtualNodeSpec | string>) {
    super({ elementClass }, children);
  }

  didMount(): void {
    window.addEventListener('click', this.onClick);
  }

  willDestroy(): void {
    window.removeEventListener('click', this.onClick);
  }

  private onClick = (ev: Event): void => {
    if (!this.dropdownOpen) {
      return;
    }
    const clickedInsideDropdown =
      this.domNode.contains(ev.target as HTMLElement) || Object.is(this.domNode, ev.target);
    if (!clickedInsideDropdown) {
      this.toggleDropdown();
    }
  };

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    vdom.updateNode(this.domNode, this.render());
  }

  render(): VirtualNodeSpec {
    if (this.dropdownOpen) {
      return <div className="{this.props.elementClass} dropdown">{...this.children}</div>;
    } else {
      return null;
    }
  }
}
