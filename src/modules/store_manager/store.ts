import { Action } from './action';

export class Store<DataType> {
  private data: DataType;
  private reducer: (curData: DataType, action?: Action) => DataType;
  private updateCallbacks: Array<() => void> = [];

  constructor(initialData: DataType, reducer: (curData: DataType, action?: Action) => DataType) {
    this.data = initialData;
    this.reducer = reducer;
  }

  dispatch(action: Action) {
    this.data = this.reducer(this.data, action);
    this.updateCallbacks.forEach((callback) => callback());
  }

  addCallback(callback: () => void) {
    this.updateCallbacks.push(callback);
  }

  removeCallback(callback: () => void) {
    this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== callback);
  }

  getData() {
    return this.data;
  }
}
