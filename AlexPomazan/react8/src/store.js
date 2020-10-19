import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { apiMiddleware } from "redux-api-middleware";
import reduxThunk from "redux-thunk";

import { chatFireMiddleware } from "./middlewares/chatFire";
import { chatUnfireMiddleware } from "./middlewares/chatUnfire";

import { createRootReducer } from "reducers";
import { botMiddware } from "./middlewares/bot";

export const history = createBrowserHistory();

const persistConfig = {
  key: "app",
  storage,
  blacklist: ["chats", "profile"],
};

export const initStore = () => {
  const initialStore = {};
  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        apiMiddleware,
        logger,
        botMiddware,
        chatFireMiddleware,
        chatUnfireMiddleware
      )
    )
  );

  const persistor = persistStore(store);
  return { store, persistor };
};
