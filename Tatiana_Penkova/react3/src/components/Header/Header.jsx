import React, { Component } from "react";
import pic from "../../img/chat.png";
import "./Header.css";

export class Header extends Component {

    render() {
        return (
            <div className="header">
                <img src={pic} />
                <p className="header-text">Let's Talk!</p>
            </div>
        )
    }
}