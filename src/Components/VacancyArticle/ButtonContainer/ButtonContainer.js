import {
  Component,
  ComponentController,
  ComponentModel,
} from '../../../modules/Components/Component.js';
import { ButtonContainerView } from './ButtonContainerView.js';

export class ButtonContainer extends Component {
  constructor({ isOwner, isApplicant, ownerId, vacancyId, existingElement }) {
    super({
      modelClass: ComponentModel,
      viewClass: ButtonContainerView,
      controllerClass: ComponentController,
      viewParams: { isOwner, isApplicant, ownerId, vacancyId },
      existingElement,
    });
  }
}
