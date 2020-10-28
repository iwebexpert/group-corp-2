import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { apiMiddleware } from "redux-api-middleware";

import { createRootReducer } from "./reducers/index";
import { routerMiddleware } from "connected-react-router";
/*import logger from "redux-logger";*/
import { chatBotMiddware } from "./middlewares/chatBot";

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
      applyMiddleware(routerMiddleware(history), chatBotMiddware, apiMiddleware)
    )
  );

  const persistor = persistStore(store);
  return { store, persistor };
};
