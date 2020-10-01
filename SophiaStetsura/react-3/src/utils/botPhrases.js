const botAnswers = [
    'Ой, опять ты',
    'Шел бы ты отсюда, дружок',
    'Вилкой в глаз или...?',
    'Уходи и дверь закрой',
    'Не хочу с тобой болтать',
    'Я - личность',
    'Оставь меня, я грустен',
    'Откуда ты это знаешь?',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];

  export default () => botAnswers[Math.floor(botAnswers.length * Math.random())];
