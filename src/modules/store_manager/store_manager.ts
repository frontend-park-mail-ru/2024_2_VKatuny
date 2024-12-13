import { Store } from './store';
import { Action } from './action';
import { VirtualDomRoot } from '@/modules/vdom/virtual_dom_root';

class StoreManager {
  private stores: Array<Store<unknown>> = [];
  // Since there can be more than one Virtual DOM in page,
  // it is an Array
  private vdomRoots: Array<VirtualDomRoot> = [];
  private needToUpdateVdom: boolean = false;

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
    this.updateVdom();
  }

  private updateVdom() {
    console.log('updating vdom');
    const someVdomUpdating = this.vdomRoots.some((vdomRoot) => vdomRoot.checkVdomUpdating());
    if (someVdomUpdating) {
      console.log('blocked updating vdom');
      this.needToUpdateVdom = true;
      return;
    }
    do {
      this.needToUpdateVdom = false;
      this.vdomRoots.forEach((vdomRoot: VirtualDomRoot) => {
        vdomRoot.update();
      });
    } while (this.needToUpdateVdom);
  }
}

export const storeManager = new StoreManager();
