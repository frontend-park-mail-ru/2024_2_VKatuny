import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Input, Option } from '../input/input';
import './complex_search.scss';
import { SearchBar } from '../search_bar/search_bar';

export interface ComplexSearchProps {
  elementClass?: string;
  searchByOptions: Option[];
  searchCategoryOptions: Option[];
  searchQuery: string;
  searchBy: string;
  searchCategory: string;
  onSubmit: (ev: Event) => void;
}

export class ComplexSearch extends Component {
  render() {
    return (
      <form
        className={`${this.props.elementClass} complex-search complex-search_theme-inside-column`}
        onSubmit={this.props.onSubmit}
      >
        <h3 className="complex-search__header">Поиск</h3>
        <div className="complex-search__input-box">
          <SearchBar
            key="input-search-bar"
            elementClass="complex-search__search-bar"
            id="search-query"
            fieldText={this.props.searchQuery}
          />
          <Input
            key="input-search-by"
            elementClass="complex-search__search-by"
            id="search-by"
            label="Поиск по:"
            name="searchBy"
            type="select"
            layout="horizontal"
            options={this.props.searchByOptions}
            value={this.props.searchBy}
          />
          <Input
            key="input-search-category"
            elementClass="complex-search__search-category"
            id="search-category"
            label="В категории"
            name="searchCategory"
            type="select"
            layout="horizontal"
            options={this.props.searchCategoryOptions}
            value={this.props.searchCategory}
          />
        </div>
      </form>
    );
  }
}
