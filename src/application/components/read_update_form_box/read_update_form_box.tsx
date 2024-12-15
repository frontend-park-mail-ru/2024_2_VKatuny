import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './read_update_form_box.scss';

export interface ReadUpdateFormBoxProps {
  elementClass?: string;
  canUpdate?: boolean;
}

export class ReadUpdateFormBox extends Component {
  private isUpdating: boolean = false;
  constructor(
    { elementClass = '', canUpdate = false }: ReadUpdateFormBoxProps,
    [readChild, updateChild]: Array<VirtualNodeSpec | string>,
  ) {
    super({ elementClass, canUpdate }, [readChild, updateChild]);
  }

  private handleUpdateClick = (ev: Event) => {
    ev.preventDefault();
    this.isUpdating = true;
    this.domNode.virtualNode.root.update();
  };

  private handleSaveClick = (ev: Event) => {
    ev.preventDefault();
    this.isUpdating = false;
    this.domNode.virtualNode.root.update();
  };

  private handleResetClick = (ev: Event) => {
    ev.preventDefault();
    this.isUpdating = false;
    this.domNode.virtualNode.root.update();
  };

  render() {
    return (
      <div className={`${this.props.elementClass} read-update-form-box`}>
        {this.isUpdating ? this.children[1] : this.children[0]}
        {this.props.canUpdate && (
          <div className="read-update-form-box__button-container">
            {!this.isUpdating && (
              <button
                type="button"
                className="read-update-form-box__update-button button button_main-primary"
                onClick={this.handleUpdateClick}
              >
                Редактировать
              </button>
            )}
            {this.isUpdating && (
              <button
                type="submit"
                className="read-update-form-box__form-submit-button button button_main-primary"
                onClick={this.handleSaveClick}
              >
                Сохранить
              </button>
            )}
            {this.isUpdating && (
              <button
                type="reset"
                className="read-update-form-box__form-reset-button button button_danger-tertiary"
                onClick={this.handleResetClick}
              >
                Отменить
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
