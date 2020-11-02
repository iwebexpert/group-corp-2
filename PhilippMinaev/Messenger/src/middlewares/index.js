import React from "react";
import ReactDom from "react-dom";
import { Layout } from "./components/Layout";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { initStore, history } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = initStore();

ReactDom.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
