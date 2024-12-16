import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';

export class LoadingScreen extends Component {
  render() {
    return <div class="loading-screen">Загружаем...</div>;
  }
}
