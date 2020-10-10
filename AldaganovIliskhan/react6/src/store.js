import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import { createRootReducer } from "./reducers";
export const history = createBrowserHistory();
const persistConfig = {
  key: "app",
  storage,
};
export const initStore = () => {
  const initialStore = {};
  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(applyMiddleware(routerMiddleware(history)))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
