import React from "react";
import MessengerArea from "../messenger/MessengerArea";
import SelectDialogPanel from "../messenger/SelectDialogPanel";

export default () => {
    return (
        <div className={'MessagesPage'}>
            <SelectDialogPanel/>
            <MessengerArea/>
        </div>
    );
}
