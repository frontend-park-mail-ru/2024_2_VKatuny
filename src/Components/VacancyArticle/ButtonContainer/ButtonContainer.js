import { Component, ComponentController, ComponentModel } from '@/modules/Components/Component';
import { ButtonContainerView } from './ButtonContainerView';

export class ButtonContainer extends Component {
  constructor({ isOwner, isApplied, isApplicant, ownerId, vacancyId, existingElement }) {
    super({
      modelClass: ComponentModel,
      viewClass: ButtonContainerView,
      controllerClass: ComponentController,
      viewParams: { isOwner, isApplicant, isApplied, ownerId, vacancyId },
      existingElement,
    });
  }
}
