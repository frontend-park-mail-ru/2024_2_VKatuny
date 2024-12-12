import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Header } from '@/application/components/header/header';
import './page-container.scss';

export class PageContainer extends Component {
  render() {
    return (
      <div className={`${this.props.elementClass} page-container`}>
        <div class="page-container__header-container">
          <Header />
        </div>
        {this.children}
      </div>
    );
  }
}
