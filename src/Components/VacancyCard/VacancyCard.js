import {
  Component,
  ComponentController,
  ComponentModel,
} from '../../modules/Components/Component.js';
import { VacancyCardView } from './VacancyCardView.js';

export class VacancyCard extends Component {
  constructor({ vacancyObj, existingElement }) {
    super({
      modelClass: ComponentModel,
      controllerClass: ComponentController,
      viewClass: VacancyCardView,
      viewParams: { vacancyObj },
      existingElement,
    });
  }
}
