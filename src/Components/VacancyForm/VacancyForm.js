import { Component } from '@/modules/Components/Component';
import { LiteralInput } from '@/Components/FormInputs/LiteralInput/LiteralInput';
import { CityInput } from '@/Components/FormInputs/CityInput/CityInput';
import { CurrencyInput } from '@/Components/FormInputs/CurrencyInput/CurrencyInput';
import { TextInput } from '@/Components/FormInputs/TextInput/TextInput';
import { ValidatedTextArea } from '@/Components/FormInputs/ValidatedTextArea/ValidatedTextArea';
import { VacancyFormController } from './VacancyFormController';
import { VacancyFormModel } from './VacancyFormModel';
import { VacancyFormView } from './VacancyFormView';
import { SelectInput } from '../FormInputs/SelectInput/SelectInput';

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
    this._positionField = new TextInput({
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
    this._groupField = new SelectInput(
      {
        options: [
          { value: '', caption: 'Не указывать' },
          { value: 'Художник', caption: 'Художник' },
          { value: 'Дизайнер', caption: 'Дизайнер' },
          { value: 'Музыкант', caption: 'Музыкант' },
          { value: 'Фотограф', caption: 'Фотограф' },
          { value: 'Видеограф', caption: 'Видеограф' },
          { value: 'Артист Актёр', caption: 'Артист/Актёр' },
          { value: 'Писатель', caption: 'Писатель' },
        ],
      },
      this._view.groupField,
    );
    this._children.push(
      this._positionField,
      this._workTypeField,
      this._locationField,
      this._descriptionField,
      this._groupField,
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
