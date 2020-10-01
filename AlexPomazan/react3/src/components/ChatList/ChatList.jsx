import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";

import mamaImg from "./../../img/mama.jpg";
import vladImg from "./../../img/vlad.png";
import andreyImg from "./../../img/andrey.png";
import bmstuImg from "./../../img/bmstu.png";

import "./ChatList.css";

export class ChatList extends Component {
  render() {
    return (
      <>
        <h3 className="heading-chats">Список чатов</h3>
        <Box className="box" border={1} borderColor="grey.200">
          <List>
            <ListItem>
              <img className="img-author" src={vladImg} alt="" />
              <div className="message">
                <b className="message__author">Влад</b>
                <p className="message__text">Привет, нам завтра ко скольки?</p>
              </div>
            </ListItem>
            <hr />
            <ListItem>
              <img className="img-author" src={mamaImg} alt="" />
              <div className="message">
                <b className="message__author">Мама</b>
                <p className="message__text">
                  Как ты себя чувствуешь? Поправился?
                </p>
              </div>
            </ListItem>
            <hr />
            <ListItem>
              <img className="img-author" src={bmstuImg} alt="" />
              <div className="message">
                <b className="message__author">Деканат</b>
                <p className="message__text">С понедельника отчисление!</p>
              </div>
            </ListItem>
            <hr />
            <ListItem>
              <img className="img-author" src={andreyImg} alt="" />
              <div className="message">
                <b className="message__author">Андрей</b>
                <p className="message__text">Я завтра не приду на пары</p>
              </div>
            </ListItem>
          </List>
        </Box>
      </>
    );
  }
}
