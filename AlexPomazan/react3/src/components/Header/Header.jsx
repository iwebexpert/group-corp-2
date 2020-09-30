import React, { Component } from "react";
import "./Header.css";

export class Header extends Component {
  render() {
    return (
      <header>
        <a className="header-heading" href="/">
          Messenger
        </a>
      </header>
    );
  }
}
