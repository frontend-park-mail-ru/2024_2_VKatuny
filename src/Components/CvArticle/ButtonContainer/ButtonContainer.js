import {
  Component,
  ComponentController,
  ComponentModel,
} from '../../../modules/Components/Component.js';
import { ButtonContainerView } from './ButtonContainerView.js';

export class ButtonContainer extends Component {
  constructor({ isOwner, isEmployer, ownerId, cvId, existingElement }) {
    super({
      modelClass: ComponentModel,
      viewClass: ButtonContainerView,
      controllerClass: ComponentController,
      viewParams: { isOwner, isEmployer, ownerId, cvId },
      existingElement,
    });
  }
}
