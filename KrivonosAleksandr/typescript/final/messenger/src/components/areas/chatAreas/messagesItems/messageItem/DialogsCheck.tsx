import React from 'react';
import {DialogName} from "./DialogName";

type DialogsCheckType = {
    items: chatsPayload[];
}

export const DialogsCheck: React.FC<DialogsCheckType> = ({items}) => {

    return (
        <>
            {items.map((item) => (<DialogName id={item.id} name={item.name} fire={item.fire} lastMessage={item.messages} key={item.id}/>))}
        </>
    )
};