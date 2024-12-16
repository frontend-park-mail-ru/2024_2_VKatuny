import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './read_update_form_box.scss';

export interface ReadUpdateFormBoxProps {
  elementClass?: string;
  canUpdate?: boolean;
  isUpdating: boolean;
  setIsUpdating: (isUpdating: boolean) => void;
  formId?: string;
}

export class ReadUpdateFormBox extends Component {
  constructor(
    {
      elementClass = '',
      canUpdate = false,
      formId,
      isUpdating,
      setIsUpdating,
    }: ReadUpdateFormBoxProps,
    [readChild, updateChild]: Array<VirtualNodeSpec | string>,
  ) {
    super({ elementClass, canUpdate, formId, isUpdating, setIsUpdating }, [readChild, updateChild]);
  }

  private handleUpdateClick = (ev: Event) => {
    ev.preventDefault();
    (this.props.setIsUpdating as (isUpdating: boolean) => void)(true);
    this.domNode.virtualNode.root.update();
  };

  render() {
    return (
      <div className={`${this.props.elementClass} read-update-form-box`}>
        {this.props.isUpdating ? this.children[1] : this.children[0]}
        {this.props.canUpdate && (
          <div className="read-update-form-box__button-container">
            {!this.props.isUpdating && (
              <button
                type="button"
                className="read-update-form-box__update-button button button_main-primary"
                onClick={this.handleUpdateClick}
              >
                Редактировать
              </button>
            )}
            {this.props.isUpdating && (
              <button
                type="submit"
                form={this.props.formId}
                className="read-update-form-box__form-submit-button button button_main-primary"
              >
                Сохранить
              </button>
            )}
            {this.props.isUpdating && (
              <button
                type="reset"
                form={this.props.formId}
                className="read-update-form-box__form-reset-button button button_danger-tertiary"
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
