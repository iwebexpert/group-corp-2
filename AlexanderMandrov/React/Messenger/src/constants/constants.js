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

usernames.forEach(user => {
  notifications.push(Math.floor(Math.random() * 20));
  avatarColors.push(Math.floor(Math.random() * paletteLength));
  messages.push(rawMessages[Math.floor(Math.random()*5)]);
});

const createPrimaryChats = () => {
  return usernames.map((user, id) => {
    return {
      id: user,
      username: user,
      messages: [
        {
          id: nanoid(),
          username: user,
          date: (new Date()),
          text: messages[id]
        }
      ]
    }
  });
};

const rawChats = createPrimaryChats();

export { rawChats, notifications, avatarColors };