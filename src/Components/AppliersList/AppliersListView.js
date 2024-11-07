import { ComponentView } from '../../modules/Components/Component.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';

export class AppliersListView extends ComponentView {
  #listItems;
  #isEmpty;
  constructor(renderParams, existingElement) {
    super({
      renderParams,
      existingElement,
      templateName: 'appliers-list.hbs',
    });
    this.list = this._html.querySelector('.appliers-list__list');
    this.#listItems = [];
    this.#isEmpty = true;
    this.list.innerText = 'Пока никто не откликнулся';
  }

  addListItem({ id, name }) {
    if (this.#isEmpty) {
      this.#isEmpty = false;
      this.list.innerHTML = '';
    }
    const listItem = document.createElement('li');
    const anchorElement = document.createElement('a');
    anchorElement.href = `${resolveUrl('profile')}?id=${id}&userType=${USER_TYPE.APPLICANT}`;
    anchorElement.innerText = name;
    anchorElement.classList.add('appliers-list__list-item');
    listItem.appendChild(anchorElement);
    this.list.appendChild(listItem);
    this.#listItems.push(listItem);
  }
}
