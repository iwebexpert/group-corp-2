import React from 'react';
import {DialogName} from "./DialogName";

export const DialogsCheck = (props) => {
    return props.items.map((item) => (<DialogName id={item.id} image={item.image} name={item.name} lastMessage={item.messages} key={item.id}/>))
};