import React, { Component } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import Avatar from "@material-ui/core/Avatar";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { ChatForm } from "../ChatForm";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { chats } from "../../Helpers";
import "./Messenger.css";

export class Messenger extends Component {
    state = {
        chats
    };

    interval = null;


    handleMessageSend = (message) => {
        const { chats } = this.state;
        const { match } = this.props;
        console.log("props message", this.props);
        console.log("message chat", chats)

        const chat = chats[match.params.id];
        message.id = nanoid();
        chat.messages = this.messages.concat([message]);

        chats[match.params.id] = chat;

        this.setState({
            chats,
        });
        clearTimeout(this.interval);
    };

    randomMessage(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    componentDidUpdate(PrevProps, prevState) {
        if (prevState === this.state || prevState.chats.length !== this.state.chats.length || this.messages === null || this.messages.length == 0) {
            return;
        }

        clearTimeout(this.interval);
        const lastAuthor = this.messages[this.messages.length - 1].author;
        const botAnswer = [`Привет, ${lastAuthor}, чем я могу тебе помочь?`, `${lastAuthor}, спроси что-нибудь проще.`, `Очень интересная история, ${lastAuthor}`, `Не согласен с тобой, ${lastAuthor}.`, `Привет, ${lastAuthor}, приятно познакомиться!`, `${lastAuthor}, повтори, пожалуйста.`, `${lastAuthor}, полностью согласен!`, `${lastAuthor}, как дела?`, `${lastAuthor}, погода и правда сегодня хорошая.`, `${lastAuthor}, пока!`];

        const index = this.randomMessage(1, 10);

        const answer = {
            author: "Bot",
            text: botAnswer[index - 1],
        };

        if (this.messages.length) {
            if (lastAuthor !== 'Bot') {
                this.interval = setTimeout(() => {
                    this.handleMessageSend(answer);
                }, 1000);
            }
        }
    }

    get messages() {
        const { chats } = this.state;
        const { match } = this.props;

        let messages = null;

        if (match && chats[match.params.id]) {
            messages = chats[match.params.id].messages;
        }
        return messages;
    }

    handleNewChat = (chat) => {
        const { chats } = this.state;

        chat.id = chats.length;
        chat.messages = [];

        this.setState({
            chats: [...chats, chat]
        });
    }

    render() {
        const { chats } = this.state;
        const messages = this.messages;
        console.log("render", chats)
        const chatsList = chats.map((item) => (
            <List key={item.id} className="chat-root">
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="avatar">
                            {item.title.substr(0, 1)}  </Avatar>
                    </ListItemAvatar>
                    <Link className="nav-link" to={`/chats/${item.id}`}>
                        <ListItemText
                            primary={item.title}
                            secondary={
                                <React.Fragment>
                                    {item.messages[item.messages.length - 1] && item.messages[item.messages.length - 1].text}
                                </React.Fragment>
                            }
                        />
                    </Link>
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        ));

        return (<>
            <Header />
            <div className="main">
                <div className="chats-container">
                    <div className="chats">
                        {chatsList}
                    </div>
                    <div className="new-chat">
                        <ChatForm
                            onSend={this.handleNewChat}
                        />
                    </div>
                </div>
                <div className="messanger">
                    <div className="messages-list"> {messages ? <MessagesList items={messages} /> : <div className="empty-chat">Выберите чат слева
                    <SubdirectoryArrowLeftIcon className="arrow-to-chat" />
                    </div>
                    }</div>

                    {messages && <MessageForm onSend={this.handleMessageSend} />}
                </div>
            </div>
            <Footer />
        </>
        );
    }
}