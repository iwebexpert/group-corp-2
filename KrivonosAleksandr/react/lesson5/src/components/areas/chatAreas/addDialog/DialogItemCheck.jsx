import React from 'react';
import {AddDialogItem} from "./AddDialogItem";


export const DialogItemCheck = (props) => {

    return props.friendsList.map((item) => (<AddDialogItem id={item.id} name={item.name} key={item.id} onAddDialog={props.onAddDialog}/>))
};