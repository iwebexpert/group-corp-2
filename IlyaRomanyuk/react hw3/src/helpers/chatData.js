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

        messages: [
            {
                author: 'Rafael Ramaisen',
                image: m1,
                message: 'Hi!!'
            },

            {
                author: 'Rafael Ramaisen',
                image: m1,
                message: 'How are you ?'
            },

            {
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

        messages: [
            {
                author: 'Rafael Ramaisen',
                image: m1,
                message: 'Hi!!'
            },

            {
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

        messages: [
            {
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

        messages: [
            {
                author: 'Hugh Reynolds',
                image: m5,
                message: 'Sup bro! Can you call me pls?'
            }
        ]
    },
]