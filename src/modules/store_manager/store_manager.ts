import { Store } from './store';
import { Action } from './action';
import { VirtualDomRoot } from '@/modules/vdom/virtual_dom_root';
import * as vdom from '@/modules/vdom/virtual_dom';

class StoreManager {
  private stores: Array<Store<unknown>> = [];
  // Since there can be more than one Virtual DOM in page,
  // it is an Array
  private vdomRoots: Array<VirtualDomRoot> = [];

  addStore(store: Store<unknown>) {
    this.stores.push(store);
  }

  bindVirtualDom(vdomRoot: VirtualDomRoot) {
    this.vdomRoots.push(vdomRoot);
  }

  dispatch(action: Action) {
    // All views should subscribe to each store they want to use,
    // But dom update will be performed here
    this.stores.forEach((store) => store.dispatch(action));
    this.vdomRoots.forEach((vdomRoot: VirtualDomRoot) => vdomRoot.update());
  }
}

export const storeManager = new StoreManager();
