import React from "react";
import MessengerArea from "./MessengerArea";
import SelectDialogPanel from "./SelectDialogPanel/SelectDialogPanel";

const MessagesPage: React.FC = () => {
    return (
        <div className={'MessagesPage'}>
            <SelectDialogPanel/>
            <MessengerArea/>
        </div>
    );
};
export default MessagesPage;
