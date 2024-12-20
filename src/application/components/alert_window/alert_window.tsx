import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './alert_window.scss';

export interface AlertWindowProps {
  elementClass: string;
  text: string;
  href: string;
  buttonText: string;
  header?: string;
}
export class AlertWindow extends Component {
  constructor({ elementClass, text, href, buttonText, header = '' }: AlertWindowProps) {
    super({ elementClass, text, href, buttonText, header });
  }
  render() {
    return (
      <div className={`${this.props.elementClass} alert-window alert-window_theme-dark`}>
        {(this.props.header || false) && (
          <div className="alert-window__header">{this.props.header}</div>
        )}
        <div className="alert-window__text">{this.props.text}</div>
        <a className="alert-window__button button button_main-primary" href={this.props.href}>
          {this.props.buttonText}
        </a>
      </div>
    );
  }
}
