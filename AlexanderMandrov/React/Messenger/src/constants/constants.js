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

let notifications = [],
  messages = [];

usernames.forEach(user => {
  notifications.push(Math.floor(Math.random()*20));
  messages.push(rawMessages[Math.floor(Math.random()*5)]);
});

export { usernames, messages, notifications };