export const ListMixin = {
  _items: [],

  bindMinicard(minicard) {
    this._items.push(minicard);
    this._children.push(minicard);
  },

  unbindMinicard(minicardIndex) {
    this._items.splice(minicardIndex, 1);
  },
};
