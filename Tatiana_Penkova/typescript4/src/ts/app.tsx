import React from "react";
import ReactDom from "react-dom";
import { Switch, Route } from "react-router-dom";
import { routes } from "./routes";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { initStore, history } from "./store";

export const { store, persistor } = initStore();

ReactDom.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
                <Switch>
                    {routes.map((route, index) => (<Route key={index} {...route} />))}
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    , document.getElementById("root"));