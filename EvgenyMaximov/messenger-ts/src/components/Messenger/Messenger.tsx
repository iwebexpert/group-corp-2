import React, { useEffect } from "react";
import ClearAllIcon from "@material-ui/icons/ClearAll";

import { MessageForm } from "../MessageForm";
import { MessagesList } from "../MessageList";

import "../../App.scss";

type MessengerPropsType = {
chatTitle: string|null,
classchattitle: string,
classform: string,
classlist: string,
isLoading: boolean,
isPending: boolean,
messages: MessageType[]
onClearChat: (chatId:number) => void,
onMessageDelete: (id:string) => void,
onMessageSend: (message: MessageType) => void,
};

export const Messenger:React.FC<MessengerPropsType> = ({ 
	messages,
	classlist,
	classform,
	onMessageSend,
	onMessageDelete,
	onClearChat,
	chatTitle,
	classchattitle,
	isLoading,
	isPending }) => {

  const list:React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    if (list.current) {
      scrollChat();
    }
  });

  const scrollChat = ():void => {
	 const listItem:HTMLDivElement|null = list.current;
	 if(listItem)
    listItem.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  const clearChat = ():void => {
    const chatId:number = messages[0].chatId;
	 onClearChat(chatId);
  };

  return (
    <div className="chat">
      <div className={classchattitle}>
        {chatTitle ? chatTitle : <span>Waiting...</span>}
        {messages.length ? (
          <div className="clear-icon" onClick={clearChat}>
            <ClearAllIcon fontSize="small" color="secondary" />
          </div>
        ) : null}
      </div>
      <div className="messages-list" ref={list}>
        {isLoading && !chatTitle ? (
          <div className="lds-dual-ring"></div>
        ) : (
          <MessagesList
            messages={messages}
            classlist={classlist}
            onDelete={onMessageDelete}
          />
        )}
      </div>
      <div className="form">
        <MessageForm
          onSend={onMessageSend}
          classform={classform}
          isPending={isPending}
        />
      </div>
    </div>
  );
};
