import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { ItemListChild, ItemListChildProps } from './item_list_child/item_list_child';
import './item_list.scss';

export interface ItemListProps {
  elementClass: string;
  isOwner: boolean;
  addHref: string;
  childData?: ItemListChildProps[];
}

export class ItemList extends Component {
  constructor({ elementClass, isOwner, addHref, childData = [] }: ItemListProps) {
    super({ elementClass, isOwner, addHref, childData });
  }
  render() {
    const listItems =
      this.props.childData &&
      (this.props.childData as Array<ItemListChildProps>).map((childData) => {
        return (
          <ItemListChild
            elementClass="item-list__item"
            title={childData.title}
            goToLink={childData.goToLink}
            editLink={childData.editLink}
            handleDelete={childData.handleDelete}
            isOwner={childData.isOwner}
          />
        );
      });
    return (
      <div className={`${this.props.elementClass} item-list`}>
        {this.props.isOwner && (
          <div className="item-list__add-button-container">
            <a
              className="item-list__add-button button button_main-primary"
              href={this.props.addHref}
            >
              Добавить
            </a>
          </div>
        )}
        {...listItems}
      </div>
    );
  }
}
