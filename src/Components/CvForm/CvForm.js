import { Component } from '@/modules/Components/Component';
import { LiteralInput } from '@/Components/FormInputs/LiteralInput/LiteralInput';
import { ValidatedTextArea } from '@/Components/FormInputs/ValidatedTextArea/ValidatedTextArea';
import { CvFormModel } from './CvFormModel';
import { CvFormView } from './CvFormView';
import { CvFormController } from './CvFormController';

export class CvForm extends Component {
  #isNew;
  constructor({ cvId = null, elementClass, existingElement }) {
    super({
      modelClass: CvFormModel,
      viewClass: CvFormView,
      controllerClass: CvFormController,
      modelParams: { cvId },
      existingElement,
      viewParams: { elementClass, isNew: !cvId },
    });
    this.#isNew = !cvId;
    this._positionRuField = new LiteralInput({
      existingElement: this._view.positionRuField,
      selfValidate: true,
    });
    this._positionEnField = new LiteralInput({
      existingElement: this._view.positionEnField,
      selfValidate: true,
    });
    this._jobSearchStatusField = new LiteralInput({
      existingElement: this._view.jobSearchStatusField,
      selfValidate: true,
    });
    this._descriptionField = new ValidatedTextArea({
      existingElement: this._view.descriptionField,
      selfValidate: true,
    });
    this._workingExperienceField = new ValidatedTextArea({
      existingElement: this._view.workingExperienceField,
      selfValidate: true,
    });
    this._children.push(
      this._positionEnField,
      this._positionRuField,
      this._jobSearchStatusField,
      this._descriptionField,
      this._workingExperienceField,
    );
    if (!this.#isNew) {
      this.reset();
    }
  }

  get view() {
    return this._view;
  }

  reset() {
    return this._controller.reset();
  }
}
