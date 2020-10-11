export const chats = [
  {
    title: 'Текстовый чат',
    fire: false,
    messages: [
      {
        author: 'Робот',
        text: 'Напиши мне в любом чате, и я отвечу тебе ;)',
        id: 0,
        user: 'bot',
      },
    ],
  },
  {
    title: 'Рабочий чат',
    fire: true,
    messages: [
      {
        id: 0,
        author: 'Человек',
        text: 'Привет',
        user: 'human',
      },
      {
        id: 1,
        author: 'Человек',
        text: 'Ты в рабочем чате',
        user: 'human',
      },
    ],
  },
  {
    title: 'Друзья',
    fire: false,
    messages: [
      {
        id: 0,
        author: 'Робот',
        text: 'Ты мой друг?',
        user: 'bot',
      },
    ],
  },
];
