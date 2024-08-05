import { makeAutoObservable, action } from 'mobx';
import { getState, setState, subscribe } from '$lib/stores/editorStore';

class SharedStateStore {
  constructor() {
    makeAutoObservable(this);
    // @ts-ignore
    // Subscribe to external state changes and update the local state within an action
    subscribe(action((newState) => {
      this.state = newState;
    }));
  }

  state = getState();

  // @ts-ignore
  updateState(updater) {
    setState(updater(getState()));
  }
}

export default new SharedStateStore();

// @ts-ignore
export const updateState = (updater) => {
  setState(updater(getState()))
}