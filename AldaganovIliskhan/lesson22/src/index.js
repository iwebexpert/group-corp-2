import React from "react";
import ReactDom from "react-dom";

import { Layout } from "./components/Layout";
import "./index.scss";

ReactDom.render(
  <>
    <Layout />
  </>,
  document.getElementById("root")
);
