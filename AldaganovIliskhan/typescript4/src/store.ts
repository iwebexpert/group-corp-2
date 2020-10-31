import { applyMiddleware, createStore, Store } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import thunk from "redux-thunk";
import { botMiddleware } from "./middlewares/bot";
import { apiMiddleware } from "redux-api-middleware";

import { createRootReducer } from "./reducers";
import { fire } from "./middlewares/fire";
import { unfire } from "./middlewares/unfire";
export const history: History = createBrowserHistory();

const persistConfig = {
  key: "app",
  storage,
  blacklist: ["chats", "profile"],
};
export const initStore = (): { store: Store; persistor: Persistor } => {
  const initialStore = {};
  const store: Store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(
      applyMiddleware(
        botMiddleware,
        fire,
        unfire,
        thunk,
        routerMiddleware(history),
        apiMiddleware
      )
    )
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
