import { nanoid } from "nanoid"

export const chats = [
    {
        id: 0,
        title: "Test1",
        messages: [
            {
                id: nanoid(8),
                author: "Admin",
                text: "Hello!",
            },
        ],
    },
    {
        id: 1,
        title: "Test2",
        messages: [
            {
                id: nanoid(8),
                author: "Admin",
                text: "Hi!",
            },
            {
                id: nanoid(8),
                author: "Admin",
                text: "Welcome!",
            },
        ],
    },
    {
        id: 2,
        title: "Test3",
        messages: [
            {
                id: nanoid(8),
                author: "Admin",
                text: "What's up?",
            },
        ],
    },

]