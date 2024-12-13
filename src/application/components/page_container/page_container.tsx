import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Header } from '@/application/components/header/header';
import './page-container.scss';

export class PageContainer extends Component {
  render() {
    return (
      <div className={`${this.props.elementClass} page-container`}>
        <div className="page-container__header-container">
          <Header key="header" elementClass="page-container__header" />
        </div>
        {this.children}
      </div>
    );
  }
}
