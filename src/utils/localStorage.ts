const loadUserState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveUserState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {}
};

const loadProjectState = () => {
  try {
    const serializedState = localStorage.getItem("projectState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

const saveProjectState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("projectState", serializedState);
  } catch (err) {}
};

export {
  loadUserState,
  saveUserState,
  loadProjectState,
  saveProjectState
}
