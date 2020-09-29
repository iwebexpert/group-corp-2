import React from "react";
import ReactDom from "react-dom";

// import {App} from 'components/App';
// import {App2} from 'components/App2';
// import { Messenger } from "components/Messenger";
import { Layout } from "./components/Layout";
import "./index.scss";

ReactDom.render(
  <>
    <Layout />
  </>,
  document.getElementById("root")
);
