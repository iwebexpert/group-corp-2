import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ChatList } from "../ChatList";

export class Chats extends Component {
    state = {
        chats: [{
            author: "Павел",
            text: "Привет!",
            id: nanoid()
        },
        {
            author: "Максим",
            text: "Как дела?",
            id: nanoid()
        },
        {
            author: "Мама",
            text: "Купи, пожалуйста, хлеб.",
            id: nanoid()
        },
        {
            author: "Алевтина",
            text: "Привет! Я опаздываю.",
            id: nanoid()
        },
        {
            author: "Бабушка",
            text: "Когда тебя ждать в гости?",
            id: nanoid()
        },
        {
            author: "Петр Иванович",
            text: "Добрый день, подскажите, пожалуйста...",
            id: nanoid()
        }],

    };

    render() {

        const { chats } = this.state;

        return (
            <ChatList items={chats} />
        )
    }

}