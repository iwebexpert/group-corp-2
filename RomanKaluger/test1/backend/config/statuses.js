"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatTypes = exports.messageTypes = exports.wsTypes = void 0;
var wsTypes;
(function (wsTypes) {
    wsTypes["CHATS"] = "CHATS";
    wsTypes["MESSAGE"] = "MESSAGE";
    wsTypes["REMEMBER_ME"] = "REMEMBER_ME";
    wsTypes["CONTACTS"] = "CONTACTS";
})(wsTypes = exports.wsTypes || (exports.wsTypes = {}));
var messageTypes;
(function (messageTypes) {
    messageTypes["TEXT"] = "TEXT";
    messageTypes["AUDIO"] = "AUDIO";
    messageTypes["IMAGE"] = "IMAGE";
    messageTypes["SYSTEM_TEXT_PUBLIC"] = "SYSTEM_TEXT_PUBLIC";
    messageTypes["SYSTEM_TEXT_PRIVATE"] = "SYSTEM_TEXT_PRIVATE";
    messageTypes["SYSTEM_TEXT_INNER"] = "SYSTEM_TEXT_INNER";
})(messageTypes = exports.messageTypes || (exports.messageTypes = {}));
var chatTypes;
(function (chatTypes) {
    chatTypes["DIALOG"] = "DIALOG";
    chatTypes["CONVERSATION"] = "CONVERSATION";
})(chatTypes = exports.chatTypes || (exports.chatTypes = {}));
