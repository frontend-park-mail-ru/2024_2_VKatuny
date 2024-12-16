import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { PageContainer } from '@/application/components/page_container/page_container';

export class VacanciesPage extends Component {
  constructor({ url }: { url: URL }) {
    super({ url });
  }
  render() {
    return (
      <PageContainer key="page-container" elementClass="vacancies-page__page-container">
        <div className="vacancies-page vacancies-page_theme-dark">
          <div className="vacancies-page__side-column"></div>
          <div className="vacancies-page__content content-body content-body_theme-dark">
            <h1 className="content-body__header">Вакансии на сегодня</h1>
            <div className="content-body__vacancy-container vacancy-container ruler ruler_theme-dark ruler_direction-vertical"></div>
          </div>
        </div>
      </PageContainer>
    );
  }
}
