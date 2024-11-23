import { SUBMIT_ANSWER } from '@/modules/Events/Events';
import { PageController } from '@/modules/Page/Page';

export class SurveyPageController extends PageController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: SUBMIT_ANSWER,
        handler: this.handleSubmitAnswer,
      },
    ]);
  }

  handleSubmitAnswer = async ({ answer }) => {
    console.log('submitAnswer');
    this._model.saveAnswer({ questionPos: this._view.getCurrentQuestionPos(), answer });
    if (!this._view.isLastQuestion()) {
      this._view.nextQuestion();
      return;
    }
    await this._model.submitSurvey();
    location.href = 'close';
  };
}
