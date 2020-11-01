import { createStore, applyMiddleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import { apiMiddleware } from "redux-api-middleware";
import reduxThunk from "redux-thunk";

import { createRootReducer } from "./reducers";
import { botMiddleware } from "./middlewares/bot";

export const history: History = createBrowserHistory();

const persistConfig = {
  key: "app",
  storage,
  blacklist: ["chats"],
};

export const initStore = (): { store: Store; persistor: Persistor } => {
  const initialStore = {};

  const store: Store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(
      applyMiddleware(
        logger,
        botMiddleware,
        routerMiddleware(history),
        apiMiddleware,
        reduxThunk
      );
    );
  );

  const persistor: Persistor = persistStore(store);
  return { store, persistor };
};
