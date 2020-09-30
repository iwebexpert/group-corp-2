import React from "react";
import MessengerArea from "./MessengerArea";
import SelectDialogPanel from "./SelectDialogPanel";

export default () => {
    return (
        <div className={'MessagesPage'}>
            <SelectDialogPanel/>
            <MessengerArea/>
        </div>
    );
}
