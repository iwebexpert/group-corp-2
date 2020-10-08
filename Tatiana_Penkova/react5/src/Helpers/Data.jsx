import { nanoid } from "nanoid";

export const profile = {
    name: "Леопольд Пермяков",
    age: 19,
    nickname: "Лёпа",
    tel: "+7-(989)-989-989-989",
    lastVisit: new Date().toLocaleString(),
};

export const chats = [{
    title: "Чат с друзьями",
    messages: [
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Привет!"
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Как дела?"
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Что делаешь?"
        },
    ],

    id: 0
},
{
    title: "Чат с семьей",
    messages: [
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Привет!"
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Как поживаете?"
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Как картошка на даче растет?"
        },
    ],
    id: 1
},
{
    title: "Чат с мамой",
    messages: [
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Купить хлеб?"
        },
    ],
    id: 2
},
{
    title: "Тестовый чат",
    messages: [
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Привет!"
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Test"
        },
    ],
    id: 3
},
{
    title: "Тестовый чат 2",
    messages: [
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Привет!"
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Тестовое сообщение."
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Каждый охотник желает знать..."
        },
    ],
    id: 4
},
{
    title: "Test",
    messages: [
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Hello"
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "World"
        },
        {
            id: nanoid(),
            author: `${profile.nickname}`,
            text: "Hello, world"
        },
    ],
    id: 5
}];

