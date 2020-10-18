import React from 'react';
import PropTypes from 'prop-types';
import MessageField from './MessageField';
import ChatList from './ChatList';
import Header from './Header';
import '../styles/layout.css';


export default class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
    };

    static defaultProps = {
        chatId: 1,
    };

    render() {
        return (
            <div className="layout">
                <Header chatId={ this.props.chatId } />
                <div className="layout-canvas">
                    <div className="layout-left-side">
                        <ChatList />
                    </div>
                    <div className="layout-right-side">
                        <MessageField chatId={ this.props.chatId } />
                    </div>
                </div>
            </div>
        )
    }
}