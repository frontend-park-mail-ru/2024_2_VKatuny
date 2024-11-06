import { Component } from '/src/modules/Components/Component.js';
import { UserTypeRadiogroupModel } from './UserTypeRadiogroupModel.js';
import { UserTypeRadiogroupController } from './UserTypeRadiogroupController.js';
import { UserTypeRadiogroupView } from './UserTypeRadiogroupView.js';

export class UserTypeRadiogroup extends Component {
  constructor({ renderParams, existingElement }) {
    super({
      modelClass: UserTypeRadiogroupModel,
      controllerClass: UserTypeRadiogroupController,
      viewClass: UserTypeRadiogroupView,
      existingElement,
      viewParams: renderParams,
    });
  }
}
