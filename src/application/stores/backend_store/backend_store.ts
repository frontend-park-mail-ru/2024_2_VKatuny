import { Store } from '@/modules/store_manager/store';
import { storeManager } from '@/modules/store_manager/store_manager';
import backendConfig from '@/config/backend.json';

export interface BackendData {
  backendOrigin: URL;
}

function backendStoreReducer(curData: BackendData): BackendData {
  return curData;
}

export const backendStore = new Store<BackendData>(
  {
    backendOrigin: new URL(backendConfig.backendPrefix),
  },
  backendStoreReducer,
);

storeManager.addStore(backendStore);
