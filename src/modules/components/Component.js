export class Component {
  constructor(renderParams = {}) {
    this._html = document.createElement('template');
    this._html.innerHTML = this.renderStatic(renderParams);
    this._html = this._html.content.firstChild;
    this._html = document.adoptNode(this._html);
  }

  renderStatic() {
    return '';
  }

  /**
   * Render this component
   * @returns HTML representation of the page
   */
  render() {
    return this._html;
  }
}
