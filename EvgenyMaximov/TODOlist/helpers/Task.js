module.exports = class Task {
  constructor(title, id) {
    this.id = id;
    this.title = title;
    this.completed = false;
    this.date = `${new Date().getHours()}:${new Date().getMinutes()}`;
  }
};
