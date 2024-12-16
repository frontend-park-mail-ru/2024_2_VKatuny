import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './alert_window.scss';

export interface AlertWindowProps {
  elementClass: string;
  text: string;
  href: string;
  buttonText: string;
}
export class AlertWindow extends Component {
  constructor({ elementClass, text }: AlertWindowProps) {
    super({ elementClass, text });
  }
  render() {
    return (
      <div className={`${this.props.elementClass} alert-window alert-window_theme-dark`}>
        <div className="alert-window__text">{this.props.text}</div>
        <a className="alert-window__button button button_main-primary" href={this.props.href}>
          {this.props.buttonText}
        </a>
      </div>
    );
  }
}
