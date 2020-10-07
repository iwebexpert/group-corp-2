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
    'thoroughforemast'
];

const rawProfileInfo = {
  firstname: 'Wispy',
  lastname: 'Briskpress',
  BIO: '23 y.o. designer from San Fransisco',
  username: 'yellso',
  number: '+7 953 932-58-23'
};

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

const paletteLength = 8;

let notifications = [],
  avatarColors = [],
  messages = [];

usernames.forEach(() => {
  notifications.push(Math.floor(Math.random() * 20));
  avatarColors.push(Math.floor(Math.random() * paletteLength));
  messages.push(rawMessages[Math.floor(Math.random() * 5)]);
});

const createPrimaryChats = (usernames, sender = null) => {
  return usernames.map((user, id) => {
    return {
      id: id,
      username: user,
      messages: [
        {
          id: nanoid(),
          username: sender ? sender : user,
          date: (new Date()),
          text: sender ? 'Hi there!' : messages[id]
        }
      ]
    }
  });
};

export { usernames, notifications, avatarColors, createPrimaryChats, rawProfileInfo, stickers };