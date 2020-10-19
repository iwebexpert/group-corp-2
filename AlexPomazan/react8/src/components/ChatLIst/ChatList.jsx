import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";


export const ChatList = (props) => {
    const { items } = props;

    return items.map((item) => (
        <div className="chat" key={item.id}>
            <ListItem className="list-item">
                <Link
                    className={item.fire ? "chat-link fire" : "chat-link"}
                    to={`/chats/${item.id}`}
                >
                    <div className="content-chat">
                    <h6 className="chat-title">{item.title}</h6>
                    <div className="last-message">
                        <div className="img">
                            <img
                                className="img-author"
                                src={item.messages[item.messages.length - 1] ? item.messages[item.messages.length - 1].img : "/src/img/clearchat.png"}
                                alt=""
                            />
                        </div>
                        <div className="message">
                            <b className="message__author">
                              {item.messages[item.messages.length - 1] ? item.messages[item.messages.length - 1].author : null}
                            </b>
                            <p className="message__text">
                              {item.messages[item.messages.length - 1] ? item.messages[item.messages.length - 1].text : "Чат пуст!"}
                            </p>
                        </div>
                    </div>
                    </div>
                </Link>
            </ListItem>
        </div>
    ));
}