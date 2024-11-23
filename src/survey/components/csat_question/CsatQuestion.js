import { Component, ComponentController, ComponentModel } from '@/modules/Components/Component';
import { CsatQuestionView } from './CsatQuestionView';

export class CsatQuestion extends Component {
  constructor({ id, questionText }) {
    super({
      modelClass: ComponentModel,
      controllerClass: ComponentController,
      viewClass: CsatQuestionView,
      viewParams: { questionId: id, questionText },
    });
  }
}
