import { nanoid } from "nanoid"

export const chats = [
  {
    id: 0,
    title: "Test",
    fire: false,
    messages: [
      {
        id: nanoid(8),
        author: "User",
        text: "Hi!",
      },
    ],
  },
  {
    id: 1,
    title: "Family",
    fire: false,
    messages: [
      {
        id: nanoid(8),
        author: "Admin",
        text: "Hello!",
      },
      {
        id: nanoid(8),
        author: "Serg",
        text: "What's up?",
      },
    ],
  },
  {
    id: 2,
    title: "Test42",
    fire: false,
    messages: [
      {
        id: nanoid(8),
        author: "User",
        text: "HEY!",
      },
    ],
  },
  {
    id: 3,
    title: "DO NOT OPEN",
    fire: false,
    messages: [],
  },
]
