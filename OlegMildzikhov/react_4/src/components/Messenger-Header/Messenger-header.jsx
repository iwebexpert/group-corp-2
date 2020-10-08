import React, {Component} from 'react';
import {chats} from '../Chats-data/ChatData';
import './Messenger-Header.css';
import {Link, Route, Switch} from 'react-router-dom';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats,
        };

    }

    render() {
        console.log(this.props)
        if(this.props.takeInfo){
            return (
                <div className="header">
                    <h1>Oleg Mild</h1>
                    <Link to={`/profile/${this.props.takeInfo.info[0].userId}`}>
                        <p>Профиль друга</p>
                    </Link>
                    <h2>5 активных чатов, непрочитанных сообщений 3</h2>
                    </div>
            );
        }
        return (
            <div className="header">
                <h1>Oleg Mild</h1>
                <h2>Выбери чат!</h2>
                </div>
        );
    }
}