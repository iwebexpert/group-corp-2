import React from 'react';
import {Message} from '../Message';


export const MessagesList = (props) => {
    return props.items.map((item, index) => (<Message text = { item.text } key = { index } author = {item.author}/>));
};
