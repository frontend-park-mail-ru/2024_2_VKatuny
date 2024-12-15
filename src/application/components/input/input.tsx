import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './input.scss';

export interface InputProps {
  elementClass?: string;
  id: string;
  isRequired?: boolean;
  label: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  error?: string;
  isValid?: boolean;
  maxlength?: number;
  hasResizeVertical?: boolean;
}

export class Input extends Component {
  constructor({
    elementClass,
    id,
    isRequired = false,
    label,
    name,
    type,
    value,
    placeholder = '',
    error = '',
    isValid,
    maxlength,
  }: InputProps) {
    super({
      elementClass,
      id,
      isRequired,
      name,
      label,
      type,
      value,
      placeholder,
      error,
      isValid,
      maxlength,
    });
  }

  render() {
    return (
      <div className={`${this.props.elementClass} input`}>
        <label for={this.props.id} className="input__label">
          {this.props.label}
          {this.props.isRequired ? <span className="input__required-sign">*</span> : ''}
        </label>
        {this.props.type !== 'textarea' ? (
          <input
            type={this.props.type}
            className={`input__field ${this.props.isValid !== undefined ? (this.props.isValid ? 'input__field_ok' : 'input__field_error') : ''}`}
            name={this.props.name}
            id={this.props.id}
            placeholder={this.props.placeholder}
            maxlength={this.props.maxlength}
            value={this.props.value}
          />
        ) : (
          <textarea
            className={`input__field ${this.props.isValid !== undefined ? (this.props.isValid ? 'input__field_ok' : 'input__field_error') : ''} ${this.props.hasResizeVertical ? 'input__field_resize-vertical' : ''}`}
            name={this.props.name}
            id={this.props.id}
            value={this.props.value}
          ></textarea>
        )}
        {this.props.isValid === false && this.props.error !== '' ? (
          <span className="input__error-text">{this.props.error ?? false}</span>
        ) : (
          false
        )}
      </div>
    );
  }
}
