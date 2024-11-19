import { Component } from '@/modules/Components/Component';
import { UserTypeRadiogroupModel } from './UserTypeRadiogroupModel';
import { UserTypeRadiogroupController } from './UserTypeRadiogroupController';
import { UserTypeRadiogroupView } from './UserTypeRadiogroupView';

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
