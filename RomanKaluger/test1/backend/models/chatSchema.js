"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatModel = void 0;
var mongoose_1 = require("mongoose");
var chatSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }],
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' }],
    sharedId: { type: String, required: true },
    type: { type: String, required: true },
    creator: { type: String, required: true },
});
exports.chatModel = mongoose_1.model('Chat', chatSchema, 'chats');
