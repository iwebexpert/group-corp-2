import m2 from './../img/mans/m2.png';
import m1 from './../img/mans/m1.png';
import m3 from './../img/mans/m3.png';
import m4 from './../img/mans/m4.png';
import m5 from './../img/mans/m5.png';

export const chats = [
    {
        id: 0,
        title: 'Manuel Preuß',
        image: m2,
        fire: false,

        messages: [
            {
                id: 0,
                author: 'Rafael Ramaisen',
                image: m1,
                message: 'Hi!!'
            },

            {
                id: 1,
                author: 'Rafael Ramaisen',
                image: m1,
                message: 'How are you ?'
            },

            {
                id: 2,
                author: 'Manuel Preuß',
                image: m2,
                message: 'Hey Rafael! Can we talk about last'
            }
        ]
    },

    {
        id: 1,
        title: 'Dmitry Shirshov',
        image: m3,
        fire: false,

        messages: [
            {
                id: 0,
                author: 'Rafael Ramaisen',
                image: m1,
                message: 'Hi!!'
            },

            {
                id: 1,
                author: 'Dmitry Shirshov',
                image: m3,
                message: 'Can you invite me to your conversat'
            }
        ]
    },

    {
        id: 2,
        title: 'Helga Källström',
        image: m4,
        fire: false,

        messages: [
            {
                id: 0,
                author: 'Helga Källström',
                image: m4,
                message: 'I’m very happy to introduce it!'
            }
        ]
    },

    {
        id: 3,
        title: 'Hugh Reynolds',
        image: m5,
        fire: false,

        messages: [
            {
                id: 0,
                author: 'Hugh Reynolds',
                image: m5,
                message: 'Sup bro! Can you call me pls?'
            }
        ]
    },
]