import React from "react";
import ReactDom from "react-dom";
import { SelectedListItem } from "../components/ChatsList/ChatsList";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";
import { Messenger } from "../components/Messenger";

import "./App.scss";

ReactDom.render(
  <>
    <Header />
    <div className="container">
      <SelectedListItem />
      <Messenger />
    </div>
    <Footer />
  </>,
  document.getElementById("root")
);
