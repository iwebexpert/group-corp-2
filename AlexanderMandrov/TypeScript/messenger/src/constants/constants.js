import { nanoid } from 'nanoid';

const usernames = [
  'methodicalmanrope',
  'hedgehogpalm',
  'exuberantwarlike',
  'diamondsshadowfax',
  'finnishmalfoy',
  'produceinsecure',
  'kimonocricket',
  'deafmoneybag',
  'wispyeasty',
  'unflavoredseasoned',
  'gillgeologist',
  'briskpress',
  'nervousdeny',
  'checktesticles',
  'variationidealistic',
  'yellrealistic',
  'grateuncovered',
  'meadowlarkcongealed',
  'guardsmancurvy',
  'perfectaspiring',
  'catdiscemergency',
  'thoroughforemast',
];

const stickers = [
  '❤',
  '😏',
  '🙄',
  '🥶',
  '🐦',
  '🙆🏻‍♀',
  '🦈',
  '🙃',
  '🧐',
  '🤓',
  '🥺',
  '😡',
  '🤬',
  '🥵',
  '🤯',
  '😓',
  '🤥',
  '🤤',
  '🥴',
  '🤒',
  '👻',
  '👽',
  '😾',
  '🧠',
  '🐶',
  '🐷',
  '🐵',
  '🐱',
  '🦀',
  '🦞',
  '🐳',
  '🍀',
  '🍄',
  '🌚',
  '☃',
  '🍏',
  '🍋',
  '🥝',
  '🍈',
  '🌽',
  '🥑',
  '🍱',
  '🥘',
  '🥃',
  '🍾',
  '🥡',
  '🥂',
  '⚽',
  '🏀',
  '🏈',
  '🏓',
  '🥇',
  '🏆',
  '🎪',
  '🎬',
  '🥁',
  '🎰',
  '🗿',
  '⛩',
  '🛤',
  '🏪',
  '📺',
  '📞',
  '📱',
  '🔫',
  '💣',
  '🧨',
  '🗝',
  '☣',
  '😂',
  '😉',
  '😜',
  '🤣',
  '💩',
  '👾',
  '🤐',
];

const rawMessages = [
  'I was just thinking about you!',
  'You are a great example for others.',
  'You have great ideas.',
  'When I grow up I want to be you!',
  'I appreciate all of your opinions.',
];

let messages = [];

usernames.forEach(() => {
  messages.push(rawMessages[Math.floor(Math.random() * 5)]);
});

const createPrimaryChat = (user, sender = null) => {
  return {
    id: nanoid(),
    fired: sender ? false : true,
    username: user,
    messages: sender
      ? []
      : [
          {
            id: nanoid(),
            username: sender ? sender : user,
            date: new Date(),
            text: messages[Math.random() * 5],
          },
        ],
  };
};

const API_URL = 'http://localhost:4000/';

export { createPrimaryChat, stickers, API_URL };
