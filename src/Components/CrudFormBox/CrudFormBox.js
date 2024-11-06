import { Component } from '../../modules/Components/Component.js';
import { CrudFormBoxController } from './CrudFormBoxController.js';
import { CrudFormBoxModel } from './CrudFormBoxModel.js';
import { CrudFormBoxView } from './CrudFormBoxView.js';

export class CrudFormBox extends Component {
  #form;
  constructor({ form, canUpdate, elementClass, existingElement } = {}) {
    super({
      modelClass: CrudFormBoxModel,
      viewClass: CrudFormBoxView,
      viewParams: {
        formView: form.view,
        canUpdate,
        elementClass,
      },
      controllerClass: CrudFormBoxController,
      existingElement,
    });
    this.#form = form;
    this._children.push(this.#form);
    this.#form.disable();
  }

  get form() {
    return this.#form;
  }

  enableForm() {
    this.#form.enable();
  }

  disableForm() {
    this.#form.disable();
  }
}
