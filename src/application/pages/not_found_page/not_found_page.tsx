import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { AlertWindow } from '@/application/components/alert_window/alert_window';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import './not_found_page.scss';

export interface NotFoundPageProps {
  url: URL;
}

export class NotFoundPage extends Component {
  constructor({ url }: NotFoundPageProps) {
    super({ url });
  }

  render(): VirtualNodeSpec {
    return (
      <div key="not-found-page" className="not-found-page">
        <AlertWindow
          key="alert-window"
          elementClass="not-found-page__alert-window"
          header="Ой... Вы попали не туда"
          text="Но всегда можно вернуться на главную"
          href={resolveUrl('vacancies', null)}
          buttonText="Вернуться на главную"
        />
      </div>
    );
  }
}
