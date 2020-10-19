import React from "react";
import {Link} from "react-router-dom";

import "./MessengerHeader.css";


export const Header = (props) => {
    if(props.titleChat){
        const {title} = props.titleChat;
        return (
            <div className="header">
                <Link to="/profile" >Oleg Mild</Link>
                <h2>Открыт чат с {title}</h2>
            </div>
        );
    }
    return (
        <div className="header">
            <Link to="/profile" >Oleg Mild</Link>
            <h2>Выбери чат!</h2>
        </div>
    );
}