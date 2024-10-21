import { ValidatedInputModel } from '../ValidatedInput/ValidatedInputModel.js';
import { ValidatedTextAreaView } from './ValidatedTextAreaView.js';
import { ValidatedInputController } from '../ValidatedInput/ValidatedInputController.js';
import { Component } from '../../../modules/Components/Component.js';

export class ValidatedTextArea extends Component {
  constructor(existingElement) {
    super({
      modelClass: ValidatedInputModel,
      viewClass: ValidatedTextAreaView,
      controllerClass: ValidatedInputController,
      existingElement,
    });
  }
}
