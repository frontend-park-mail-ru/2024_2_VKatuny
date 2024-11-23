import { Api } from '@/modules/api/Api';
import { PageModel } from '@/modules/Page/Page';
import { CsatQuestion } from '@/survey/components/csat_question/CsatQuestion';

export const FORM_TYPES = {
  CSAT: 'csat',
};

const FORM_TYPE_TO_QUESTION = {
  [FORM_TYPES.CSAT]: CsatQuestion,
};

export class SurveyPageModel extends PageModel {
  #formAnswer;
  constructor() {
    super();
    this.#formAnswer = [];
  }

  async getSurveyForm({ type }) {
    try {
      const formJson = await Api.getSurveyForm({ type });
      const formQuestions = formJson.map((questionJson) => {
        const formQuestion = new FORM_TYPE_TO_QUESTION[type](questionJson);
        this.#formAnswer.push({ id: questionJson.id, answer: null });
        return formQuestion;
      });
      return formQuestions;
    } catch {
      return [];
    }
  }

  saveAnswer({ questionPos, answer }) {
    this.#formAnswer[questionPos].answer = answer;
  }

  async submitSurvey() {
    Api.submitSurveyForm(this.#formAnswer);
  }
}
