import { Component } from '../../modules/Components/Component.js';
import { PersonalInfoBoxController } from './PersonalInfoBoxController.js';
import { PersonalInfoBoxModel } from './PersonalInfoBoxModel.js';
import { PersonalInfoBoxView } from './PersonalInfoBoxView.js';

export class PersonalInfoBox extends Component {
  constructor({ existingElement } = {}) {
    super({
      modelClass: PersonalInfoBoxModel,
      viewClass: PersonalInfoBoxView,
      controllerClass: PersonalInfoBoxController,
      existingElement,
    });
  }
}
