import { PageView } from '@/modules/Page/Page';
import SurveyPageHbs from './survey-page.hbs';

import '@/scss/index.scss';

export class SurveyPageView extends PageView {
  #questions;
  #currentQuestion;
  #currentQuestionPos;
  constructor(renderParams, existingElement) {
    super({ renderParams, existingElement, template: SurveyPageHbs });
    this.#questions = [];
  }

  goToQuestion(questionPos) {
    if (!(questionPos >= 0 && questionPos < this.#questions.length)) {
      return;
    }
    if (this.#currentQuestion) {
      this.#currentQuestion.classList.add('hidden');
    }
    this.#currentQuestion = this.#questions[questionPos];
    this.#currentQuestion.classList.remove('hidden');
    this.#currentQuestionPos = questionPos;
  }

  nextQuestion() {
    this.goToQuestion(this.#currentQuestionPos + 1);
  }

  isLastQuestion() {
    return this.#currentQuestionPos === this.#questions.length - 1;
  }

  renderForm(questionsRenders) {
    this.#questions = questionsRenders;
    this.#questions.forEach((question) => {
      this._html.appendChild(question);
    });
    this.#currentQuestionPos = 0;
    this.goToQuestion(this.#currentQuestionPos);
  }

  getCurrentQuestionPos() {
    return this.#currentQuestionPos;
  }
}
