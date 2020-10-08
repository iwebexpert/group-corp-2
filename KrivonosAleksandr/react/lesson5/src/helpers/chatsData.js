import {nanoid} from "nanoid";

export const chats = [
    {
        id: 0,
        name: "Father Bot",
        lastMessage: "Привет!\n Давай немного пообщаемся с тобой)",
        image: '',
        answerCount: 0,
        userName: '',
        botMessages: [`Как тебя зовут?`, `, приятно познакомиться)\nСколько тебе лет?`, `А какой у тебя опыт в программировании?)`, `Вау, это очень круто!\nПриятно было пообщаться!)`],
        messages: [
            {
                text: `Привет!\n Давай немного пообщаемся с тобой)`,
                type: 'botMsg',
                time: `It's first message`,
                id: 0
            }
        ]
    },
    {
        id: 1,
        name: "Георгий Грин",
        lastMessage: "Привет!",
        image: '',
        messages: [
            {
                text: `Привет!`,
                type: 'botMsg',
                time: `It's first message`,
                id: 0
            }
        ]
    },
    {
        id: 2,
        name: "Евгений Иванов",
        lastMessage: "Hello, my friend",
        image: '',
        messages: [
            {
                text: `Hello, my friend`,
                type: 'botMsg',
                time: `It's first message`,
                id: 0
            }
        ]
    },
    {
        id: 3,
        name: "Александр Котов",
        lastMessage: "Dolor sit amet elit.",
        image: '',
        messages: [
            {
                text: `Привет!`,
                type: 'botMsg',
                time: `It's first message`,
                id: 0
            },
            {
                text: `Dolor sit amet elit.`,
                type: 'botMsg',
                time: `It's first message`,
                id: 1
            }
        ]
    }
];