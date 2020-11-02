import { createStore, applyMiddleware, Store} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory, History } from "history";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, Persistor} from "redux-persist";
import { apiMiddleware } from "redux-api-middleware";

import { createRootReducer } from "./reducers/index";
import { routerMiddleware } from "connected-react-router";
import logger from "redux-logger";
import { chatBotMiddware } from "./middlewares/chatBot";

export const history:History = createBrowserHistory();

const persistConfig = {
  key: "app",
  storage,
  blacklist: ["chats", "profile"],
};

export const initStore = () : {store: Store, persistor: Persistor}=> {
  const initialStore = {};

  const store: Store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    initialStore,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), chatBotMiddware, apiMiddleware, logger)
    )
  );

  const persistor: Persistor = persistStore(store);
  return { store, persistor };
};
