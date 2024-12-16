import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './labeled_field.scss';

export class LabeledField extends Component {
  render() {
    return (
      <div className={`${this.props.elementClass} labeled-field`}>
        <label className="labeled-field__label">{this.props.label}</label>
        <div className="labeled-field__field">{this.props.field}</div>
      </div>
    );
  }
}
