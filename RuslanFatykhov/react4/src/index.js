import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { routes } from "./helpers/routes";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
