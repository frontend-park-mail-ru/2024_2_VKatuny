import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import SearchIcon from '@static/img/search-icon.svg';
import './search_bar.scss';

export interface SearchBarProps {
  elementClass?: string;
  fieldText: string;
  onInput?: (ev: Event) => void;
  onFocusOut?: (ev: Event) => void;
}

export class SearchBar extends Component {
  constructor({ elementClass, fieldText = '', onInput, onFocusOut }: SearchBarProps) {
    super({ elementClass, fieldText, onInput, onFocusOut });
  }

  render() {
    return (
      <div className={`${this.props.elementClass} search-bar search-bar_theme-main`}>
        <img className="search-bar__search-icon" src={SearchIcon} />
        <input
          className="search-bar__input"
          type="text"
          placeholder="Введите ваш запрос"
          maxlength="100"
          value={this.props.fieldText}
          onFocusOut={this.props.onFocusOut}
          onInput={this.props.onInput}
          name="searchQuery"
        />
      </div>
    );
  }
}
