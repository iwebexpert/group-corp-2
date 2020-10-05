import mamaImg from "./../img/mama.jpg";
import vladImg from "./../img/vlad.png";
import andreyImg from "./../img/andrey.png";
import bmstuImg from "./../img/bmstu.png";

export const chats = [
  {
    id: 0,
    title: "Чат с Владом",
    messages: [
      {
        id: 0,
        author: "Влад",
        img: vladImg,
        text: "Привет, нам завтра ко скольки?",
      },
    ],
  },
  {
    id: 1,
    title: "Чат с мамой",
    messages: [
      {
        id: 0,
        author: "Мама",
        img: mamaImg,
        text: "Как ты себя чувствуешь? Поправился?",
      },
    ],
  },
  {
    id: 2,
    title: "Чат с Андреем",
    messages: [
      {
        id: 0,
        author: "Андрей",
        img: andreyImg,
        text: "Привет, идешь завтра на пары?",
      },
      {
        id: 1,
        author: "Андрей",
        img: andreyImg,
        text: "Я не приду, если что",
      },
    ],
  },
  {
    id: 3,
    title: "Чат с деканатом",
    messages: [
      {
        id: 0,
        author: "Деканат",
        img: bmstuImg,
        text: "Отчислим, если не будешь ходить!",
      },
    ],
  },
];
