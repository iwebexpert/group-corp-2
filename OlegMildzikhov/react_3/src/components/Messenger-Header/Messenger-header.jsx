import React, {Component} from "react";
import "./Messenger-Header.css"
export  class Header extends Component{
    render() {
        return (
            <div className="header">
                <h1>Oleg Mild</h1>
                <h2>5 активных чатов, непрочитанных сообщений 3</h2>
            </div>
        );
    }
}