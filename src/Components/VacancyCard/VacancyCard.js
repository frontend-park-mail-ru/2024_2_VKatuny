import {
  Component,
  ComponentController,
  ComponentModel,
} from '../../modules/Components/Component.js';
import { VacancyCardView } from './VacancyCardView.js';

export class VacancyCard extends Component {
  constructor({ employer, vacancy }, existingElement) {
    super({
      modelClass: ComponentModel,
      controllerClass: ComponentController,
      viewClass: VacancyCardView,
      viewParams: { employer, vacancy },
      existingElement,
    });
  }
}
