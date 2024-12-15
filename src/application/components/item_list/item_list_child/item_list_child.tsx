import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './item_list_child.scss';

export interface ItemListChildProps {
  elementClass: string;
  title: string;
  goToLink?: string;
  editLink?: string;
  handleDelete?: (ev: Event) => void;
  isOwner: boolean;
}

export class ItemListChild extends Component {
  constructor({
    elementClass,
    title,
    goToLink,
    editLink,
    isOwner,
    handleDelete,
  }: ItemListChildProps) {
    super({ elementClass, title, goToLink, editLink, isOwner, handleDelete });
  }
  render() {
    return (
      <div className={`${this.props.elementClass} item-list-child item-list-child_theme-standard`}>
        <a className="item-list-child__title" href={this.props.goToLink}>
          {this.props.title}
        </a>
        {this.props.isOwner && (
          <div className="item-list-child__button-container">
            <a
              className="item-list-child__button-edit button button_main-secondary"
              href={this.props.editLink}
            >
              Изменить
            </a>
            <button
              type="button"
              class="item-list-child__button-remove button button_danger-secondary"
              onClick={this.props.handleDelete}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    );
  }
}
