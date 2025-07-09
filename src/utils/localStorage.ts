const loadState = (stateName: string) => {
  try {
    const serializedState = localStorage.getItem(stateName);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state, stateName: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(stateName, serializedState);
  } catch (err) { }
};

export {
  loadState,
  saveState
}
