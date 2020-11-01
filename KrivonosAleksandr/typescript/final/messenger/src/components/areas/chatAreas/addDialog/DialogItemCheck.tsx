import React from 'react';
import {AddDialogItem} from "./AddDialogItem";

type DialogItemCheckTypes = {
    friendsList: friendsPayload[];
    onAddDialog: (newDialog: newDialog) => void;
}

export const DialogItemCheck: React.FC<DialogItemCheckTypes> = (props) => {

    return(
        <>
            {props.friendsList.map((item) => (<AddDialogItem id={item.id} name={item.name} key={item.id} onAddDialog={props.onAddDialog}/>))}
        </>
    );
}