import React, {Component} from "react";

import "./Messenger-Header.css"
import ListItem from "@material-ui/core/ListItem";
import {Link, Route, Switch} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";


export class Header extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        if(this.props.titleChat){
            const {title} = this.props.titleChat;
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
}