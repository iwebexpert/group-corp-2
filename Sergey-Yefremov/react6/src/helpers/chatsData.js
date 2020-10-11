import { nanoid } from "nanoid"

export const chats = [
  {
    id: 0,
    title: "Test1",
    fire: false,
    messages: [
      {
        id: nanoid(8),
        author: "Admin",
        text: "Привет!",
      },
    ],
  },
  {
    id: 1,
    title: "Test2",
    fire: false,
    messages: [
      {
        id: nanoid(8),
        author: "Admin",
        text: "Hi!",
      },
      {
        id: nanoid(8),
        author: "Admin",
        text: "Welcome",
      },
    ],
  },
  {
    id: 2,
    title: "Test3",
    fire: false,
    messages: [
      {
        id: nanoid(8),
        author: "Admin",
        text: "What's up?",
      },
    ],
  },
  {
    id: 3,
    title: "Test42",
    fire: false,
    messages: [],
  },
]
