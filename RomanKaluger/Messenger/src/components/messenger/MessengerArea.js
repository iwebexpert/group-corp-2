import React from "react";
import MessengerTopPanel from "./MessengerTopPanel";
import MessagesArea from "./MessagesArea";
import InputMessageArea from "./InputMessageArea";

export default () => {
    return (
        <div className={'MessengerArea'}>
          <MessengerTopPanel/>
          <MessagesArea/>
          <InputMessageArea/>
        </div>
    );
}
