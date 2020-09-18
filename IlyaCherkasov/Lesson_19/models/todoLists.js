const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messagesShema = new Schema({
    title: { type: String, required: true },
    comments: { type: String, default: "Empty message" },
    createAt: { type: Date, default: new Date() },
})

module.exports = mongoose.model('Chats', messagesShema, 'todoList')