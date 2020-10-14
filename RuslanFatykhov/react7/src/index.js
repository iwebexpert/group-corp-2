import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Layout } from "components/Layout";
import { initStore, history } from "./store";

const { store, persistor } = initStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
