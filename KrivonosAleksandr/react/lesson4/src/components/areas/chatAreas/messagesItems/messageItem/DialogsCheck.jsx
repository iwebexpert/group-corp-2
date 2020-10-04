import React from 'react';
import {DialogName} from "./DialogName";
import {DialogNameMU} from "./DialogNameMU";


export const DialogsCheck = (props) => {

    return props.items.map((item) => (<DialogName id={item.id} image={item.image} name={item.name} lastMessage={item.messages} key={item.id}/>))


    // return props.items.map((item) => (<DialogNameMU id={item.id} image={item.image} name={item.name} lastMessage={item.lastMessage} key={item.id}/>));
};