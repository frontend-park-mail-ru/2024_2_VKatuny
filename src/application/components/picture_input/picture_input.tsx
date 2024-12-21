import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './picture_input.scss';

export interface PictureInputProps {
  elementClass: string;
  id: string;
  name: string;
  label: string;
  caption: string;
  value?: string;
  onChange?: (ev: Event) => void;
}

export class PictureInput extends Component {
  constructor({ elementClass, id, name, label, caption, value, onChange }: PictureInputProps) {
    super({ elementClass, id, name, label, caption, value, onChange });
  }
  render(): VirtualNodeSpec {
    return (
      <div class={`${this.props.elementClass} picture-input`}>
        <label for={this.props.id} className="picture-input__label">
          <div className="picture-input__label">{this.props.label}</div>
          <div
            className="picture-input__preview"
            style={`background-image: url(${this.props.value})`}
          >
            {this.props.caption ? this.props.caption : 'Выберите файл'}
          </div>
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg/, image/svg+xml, image/webp"
          className="picture-input__field"
          name={this.props.name}
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
