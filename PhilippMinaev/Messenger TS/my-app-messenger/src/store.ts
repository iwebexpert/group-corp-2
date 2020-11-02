import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { botMiddlewares } from "./middlewares/bot";
import { createBrowserHistory, History } from "history";
import { routerMiddleware } from "connected-react-router";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import { apiMiddleware } from "redux-api-middleware";
import { addMessageMiddleware } from "./middlewares/sendMessage";

import { createRootReducer } from "./reducers";

export const history: History = createBrowserHistory();

const persistConfig = {
  key: "app",
  storage,
  blacklist: ["chats", "messages"],
};

export const initStore = (): { store: Store; persistor: Persistor } => {
  const initialStore = {};
  const store: Store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(
      applyMiddleware(
        apiMiddleware,
        logger,
        botMiddlewares,
        routerMiddleware(history),
        addMessageMiddleware
      )
    )
  );

  const persistor: Persistor = persistStore(store);
  return { store, persistor };
};
