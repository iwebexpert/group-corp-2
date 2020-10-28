import React from 'react';
import {DialogName} from "./DialogName";

export const DialogsCheck = (props) => {
    return props.items.map((item) => (<DialogName onDeleteDialog={props.onDeleteDialog} id={item.id} image={item.image} name={item.name} fire={item.fire} lastMessage={item.messages} key={item.id}/>))
};