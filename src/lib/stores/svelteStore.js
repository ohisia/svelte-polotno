import { writable } from 'svelte/store';
import { getState, setState, subscribe } from '$lib/stores/editorStore';

const sharedStateStore = writable(getState());

// @ts-ignore
subscribe((newState) => {
  sharedStateStore.set(newState);
});

// @ts-ignore
export function updateState(updater) {
  setState(updater(getState()));
}

export default sharedStateStore;