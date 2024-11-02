import { ComponentView } from '../../../modules/Components/Component.js';

export class ListView extends ComponentView {
  #children;

  constructor(renderParams, existingElement) {
    super({
      renderParams,
      existingElement,
      templateName: 'list.hbs',
    });
    this.#children = [];
    this._html.classList.add('hidden');
  }

  addChild(listMemberRender) {
    this._html.appendChild(listMemberRender);
    this.#children.push(listMemberRender);
  }

  findChildIndex(childRender) {
    return this.#children.findIndex(Object.is.bind(Object, childRender));
  }

  removeChild(childIndex) {
    this.#children[childIndex].outerHTML = '';
    this.#children.splice(childIndex, 1);
  }
}
