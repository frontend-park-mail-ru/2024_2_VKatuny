import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './input.scss';

export interface Option {
  value: string;
  label: string;
}

export interface InputProps {
  elementClass?: string;
  id: string;
  isRequired?: boolean;
  label: string;
  name: string;
  type: string;
  value?: string;
  layout: string;
  placeholder?: string;
  error?: string;
  isValid?: boolean;
  maxlength?: number;
  onFocusOut?: (ev: Event) => void;
  onInput?: (ev: Event) => void;
  hasResizeVertical?: boolean;
  options?: Array<Option>;
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
    onFocusOut,
    onInput,
    error = '',
    layout = 'vertical',
    isValid,
    options = [],
    maxlength,
    hasResizeVertical,
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
      layout,
      onFocusOut,
      onInput,
      isValid,
      maxlength,
      options,
      hasResizeVertical,
    });
  }

  render() {
    return (
      <div
        className={`${this.props.elementClass} input ${this.props.layout === 'horizontal' ? 'input_layout-horizontal' : ''}`}
      >
        <label for={this.props.id} className="input__label">
          {this.props.label}
          {this.props.isRequired ? <span className="input__required-sign">*</span> : ''}
        </label>
        {this.props.type === 'textarea' && (
          <textarea
            className={`input__field ${this.props.isValid !== undefined ? (this.props.isValid ? 'input__field_ok' : 'input__field_error') : ''} ${this.props.hasResizeVertical ? 'input__field_resize-vertical' : ''}`}
            name={this.props.name}
            id={this.props.id}
            maxlength={this.props.maxlength}
            onFocusOut={this.props.onFocusOut}
            onInput={this.props.onInput}
          >
            {this.props.value ?? ''}
          </textarea>
        )}
        {this.props.type !== 'textarea' && this.props.type !== 'select' && (
          <input
            type={this.props.type}
            className={`input__field ${this.props.isValid !== undefined ? (this.props.isValid ? 'input__field_ok' : 'input__field_error') : ''}`}
            name={this.props.name}
            id={this.props.id}
            placeholder={this.props.placeholder}
            maxlength={this.props.maxlength}
            value={this.props.value}
            onFocusOut={this.props.onFocusOut}
            onInput={this.props.onInput}
          />
        )}
        {this.props.type === 'select' && (
          <select
            className={`input__field ${this.props.isValid !== undefined ? (this.props.isValid ? 'input__field_ok' : 'input__field_error') : ''}`}
            name={this.props.name}
            id={this.props.id}
            onFocusOut={this.props.onFocusOut}
            onInput={this.props.onInput}
          >
            {(this.props.options as Option[]).map((option) => (
              <option
                value={option.value}
                key={option.value}
                selected={this.props.value === option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
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
