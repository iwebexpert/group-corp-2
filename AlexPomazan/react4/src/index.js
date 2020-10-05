import React from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Switch,
  Route,
} from "react-router-dom";

import { routes } from "./routes";

ReactDom.render(
  <BrowserRouter>
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
