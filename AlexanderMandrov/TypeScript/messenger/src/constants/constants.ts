import { nanoid } from 'nanoid';

const usernames: string[] = [
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

export const stickers: string[] = [
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

const rawMessages: string[] = [
  'I was just thinking about you!',
  'You are a great example for others.',
  'You have great ideas.',
  'When I grow up I want to be you!',
  'I appreciate all of your opinions.',
];

let messages: string[] = [];

usernames.forEach((): void => {
  messages.push(rawMessages[Math.floor(Math.random() * 5)]);
});

export const createPrimaryChat: CreatePrimaryChat = (user, sender) => {
  const userId = nanoid();
  return {
    id: userId,
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
            chatId: userId,
          },
        ],
  };
};

export const API_URL: string = 'http://localhost:4000/';
