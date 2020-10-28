"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModel = void 0;
var mongoose_1 = require("mongoose");
var statuses_1 = require("../config/statuses");
var messageSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    whoRead: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }],
    dateSend: { type: Number, required: true },
    dateDelivered: { type: Number },
    dateRead: { type: Number },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String },
    isForward: { type: Boolean, default: false },
    type: { type: String, default: statuses_1.messageTypes.TEXT, required: true },
    content: { type: Object, default: null },
    forwardMessages: [{ type: Object }]
});
exports.messageModel = mongoose_1.model('Message', messageSchema, 'messages');
