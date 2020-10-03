import React from "react";
import ReactDom from "react-dom";

import { Layout } from "./components/Layout";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
ReactDom.render(
  <>
    <Router>
      <Layout />
    </Router>
  </>,
  document.getElementById("root")
);
