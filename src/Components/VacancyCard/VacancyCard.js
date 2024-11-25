import { Component, ComponentController, ComponentModel } from '@/modules/Components/Component';
import { VacancyCardView } from './VacancyCardView';

export class VacancyCard extends Component {
  constructor({ vacancyObj, existingElement }) {
    super({
      modelClass: ComponentModel,
      controllerClass: ComponentController,
      viewClass: VacancyCardView,
      viewParams: vacancyObj,
      existingElement,
    });
  }
}
