import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { botMiddleware } from "./middlewares/bot";
import { fire } from "./middlewares/fire";
import { unfire } from "./middlewares/unfire";

import { createRootReducer } from "./reducers";
export const history = createBrowserHistory();
const middleWares = [
  botMiddleware,
  fire,
  unfire,
  thunk,
  routerMiddleware(history),
];
const persistConfig = {
  key: "app",
  storage,
};
export const initStore = () => {
  const initialStore = {};
  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(applyMiddleware(...middleWares))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
