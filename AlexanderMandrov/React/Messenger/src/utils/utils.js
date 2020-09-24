const generateId = () => `unsleeping${Math.round(Math.random() * 1e8).toString(16)}`;

const createMessage = (text, username = 'guest') => {
  return {
    text,
    username,
    id: generateId(),
    date: (new Date()).toLocaleString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})
  }
};

export { createMessage };