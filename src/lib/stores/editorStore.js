let state = {
    // Your shared state properties
    counter: 0,

    name: '',
};

const subscribers = new Set();

export function getState() {
    return state;
}

// @ts-ignore
export function setState(newState) {
    state = newState;
    subscribers.forEach((callback) => callback(state));
}

// @ts-ignore
export function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
}