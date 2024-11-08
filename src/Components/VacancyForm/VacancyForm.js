import { Component } from '../../modules/Components/Component.js';
import { LiteralInput } from '/src/Components/FormInputs/LiteralInput/LiteralInput.js';
import { CityInput } from '/src/Components/FormInputs/CityInput/CityInput.js';
import { CurrencyInput } from '../../Components/FormInputs/CurrencyInput/CurrencyInput.js';
import { ValidatedTextArea } from '../FormInputs/ValidatedTextArea/ValidatedTextArea.js';
import { VacancyFormController } from './VacancyFormController.js';
import { VacancyFormModel } from './VacancyFormModel.js';
import { VacancyFormView } from './VacancyFormView.js';

export class VacancyForm extends Component {
  #isNew;
  constructor({ vacancyId = null, elementClass, existingElement }) {
    super({
      modelClass: VacancyFormModel,
      viewClass: VacancyFormView,
      controllerClass: VacancyFormController,
      modelParams: { vacancyId },
      existingElement,
      viewParams: { elementClass, isNew: !vacancyId, vacancyId },
    });
    this.#isNew = !vacancyId;
    this._positionField = new LiteralInput({
      existingElement: this._view.positionField,
      selfValidate: true,
    });
    this._workTypeField = new LiteralInput({
      existingElement: this._view.workTypeField,
      selfValidate: true,
    });
    this._salaryField = new CurrencyInput({
      existingElement: this._view.salaryField,
      selfValidate: true,
    });
    this._locationField = new CityInput({
      existingElement: this._view.locationField,
      selfValidate: true,
    });
    this._descriptionField = new ValidatedTextArea({
      existingElement: this._view.descriptionField,
      selfValidate: true,
    });
    this._children.push(
      this._positionField,
      this._workTypeField,
      this._locationField,
      this._descriptionField,
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
