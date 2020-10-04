import React, { useEffect } from "react";
import Layout from "./Layout";
import { connect } from "react-redux";
import { addChatsToState } from "../actions/chatsAction";
import { chats } from "../helpers/chatsData";
import { BrowserRouter } from "react-router-dom";

const App = (props) => {
  useEffect(() => {
    props.addChatsToState(chats);
  }, []);
  return (
    <BrowserRouter basename="/chats">
      <Layout />
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addChatsToState: (chats) => dispatch(addChatsToState(chats)),
  };
};
export default connect(null, mapDispatchToProps)(App);
