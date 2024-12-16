import * as vdom from '@/modules/vdom/virtual_dom';
import { Component } from '@/modules/vdom/virtual_node';
import { VirtualNodeSpec } from '@/modules/vdom/virtual_node';

export interface DropdownProps {
  elementClass: string;
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
}

export class Dropdown extends Component {
  private dropdownOpen: boolean = false;
  private handleClick: (ev: Event) => void;
  constructor(
    { elementClass, isOpen, setIsOpen }: DropdownProps,
    children?: Array<VirtualNodeSpec | string>,
  ) {
    super({ elementClass, isOpen, setIsOpen }, children);
    // this.handleClick = this.onClick.bind(this);
  }

  // didMount(): void {
  //   window.addEventListener('click', this.handleClick);
  // }

  // willDestroy(): void {
  //   window.removeEventListener('click', this.handleClick);
  // }

  // private onClick = (ev: Event): void => {
  //   if (!this.props.isOpen) {
  //     return;
  //   }
  //   const clickedInsideDropdown =
  //     this.domNode.contains(ev.target as HTMLElement) || Object.is(this.domNode, ev.target);
  //   if (!clickedInsideDropdown) {
  //     (this.props.setIsOpen as (newIsOpen: boolean) => void)(false);
  //   }
  // };

  render(): VirtualNodeSpec {
    return (
      <div
        className={`${this.props.elementClass} dropdown`}
        style={`visibility: ${this.props.isOpen ? 'visible' : 'hidden'}`}
      >
        {this.children}
      </div>
    );
  }
}
