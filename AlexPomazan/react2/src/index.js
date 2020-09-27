import React from "react";
import ReactDom from "react-dom";
import { Messenger } from "components/Messenger";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

ReactDom.render(
  <>
    <Messenger />
  </>,
  document.getElementById("root")
);
