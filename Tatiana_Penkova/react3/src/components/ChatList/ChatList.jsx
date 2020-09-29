import React from "react";
import { Chat, chatType } from "../Chat";
import PropTypes from "prop-types";


export const ChatList = (props) => {
    return props.items.map((items) => (
        <Chat text={items.text} author={items.author} key={items.id} />
    ));
};

ChatList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape(chatType),
    ),
};

