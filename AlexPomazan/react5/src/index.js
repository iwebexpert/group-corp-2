import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { routes } from "./routes";

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
