import React from "react";
import { HeaderContainer } from "../../containers/HeaderContainer";
import { ChatForm } from "../ChatForm";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { Loading } from "../Loading";
import { ChatList } from "../ChatList";
import { Box, Grid } from "@material-ui/core";

import "./Messenger.css";

export const Messenger = (props) => {
  const {
    messages,
    handleMessageSend,
    handleAddChat,
    handleChatsReload,
    chats,
    title,
    isLoading,
    isError,
  } = props;

  const chatList = Array.from(chats);

  if (isError) {
    return (
      <div>
        Error... <button onClick={handleChatsReload}>Обновить чаты</button>
      </div>
    );
  }

  if (isLoading) {
    return (<Loading />);
  }

  const chatTitle = <h3 className="chat-name">{title}</h3>;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <HeaderContainer />
        </Grid>
        <Grid item xs={4}>
          <h3 className="heading-chats">Список чатов</h3>
          <Box className="box" border={1} borderColor="grey.200">
            {chatList ? <ChatList items={chatList} /> : <div>ChatList</div>}
          </Box>
          <ChatForm onSend={handleAddChat} />
        </Grid>
        <Grid item xs={8}>
          {chatTitle}
          {messages ? (
            <MessagesList items={messages} />
          ) : (
              <h4 className="choose-chat">Выберите чат слева</h4>
            )}
          {messages && <MessageForm onSend={handleMessageSend} />}
        </Grid>
      </Grid>
    </>
  );
}
