const API_URL = '';

let maxId = 0;

const createMessage = (text) => {
  return {
    text,
    id: maxId++,
    date: (new Date()).toLocaleString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})
  }
};

const db = [
  createMessage('ORA ORA ORA'),
  createMessage('OMAE WA MOU SHINDEIRU'),
  createMessage('NANI')
];

export { API_URL, db, createMessage };