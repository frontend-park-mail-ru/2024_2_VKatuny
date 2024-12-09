import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { PageContainer } from '@/application/components/page_container/page_container';

export class VacanciesPage extends Component {
  constructor({ url }: { url: URL }) {
    super({ url });
  }
  render() {
    return (
      <PageContainer>
        <h1>Вакансии</h1>
      </PageContainer>
    );
  }
}
