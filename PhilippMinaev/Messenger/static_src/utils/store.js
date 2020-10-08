import { createStore } from "redux";
import initReducers from "./../reducers";

function initStore() {
  const innitialStore = {};

  return createStore(
    initReducers,
    innitialStore,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : () => {}
  );
}

export default initStore;
