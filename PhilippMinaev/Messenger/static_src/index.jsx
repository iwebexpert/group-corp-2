import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById("root")
);
