"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var statuses_1 = require("./config/statuses");
var ws_1 = __importDefault(require("ws"));
var serverConfig_1 = __importDefault(require("./config/serverConfig"));
var uniqid_1 = __importDefault(require("uniqid"));
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var messageSchema_1 = require("./models/messageSchema");
var userSchema_1 = require("./models/userSchema");
var chatSchema_1 = require("./models/chatSchema");
function start() {
    return __awaiter(this, void 0, void 0, function () {
        function broadCast(actionType, body, condition) {
            wss.clients.forEach(function (client) {
                if (client.readyState === ws_1.default.OPEN && condition(client)) {
                    client.send(JSON.stringify({
                        type: actionType,
                        body: body
                    }));
                }
            });
        }
        var DB, app, checkAuthentication, checkAuthenticationMiddleware, getChatsForUser, wss, genders, familyStatuses;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.connect(serverConfig_1.default.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })];
                case 1:
                    DB = _a.sent();
                    DB.connection.on('error', function (err) {
                        console.log(err.message);
                    });
                    DB.connection.once('open', function () {
                        console.log("mongodb connection open");
                    });
                    app = express_1.default();
                    app.use(cors_1.default());
                    app.use(express_1.default.urlencoded({ extended: false }));
                    app.use(body_parser_1.default.json({ 'type': '*/*', limit: '20mb' }));
                    app.use(express_1.default.json());
                    app.use(cookie_parser_1.default());
                    checkAuthentication = function (authorization) {
                        try {
                            return jsonwebtoken_1.default.verify(authorization, serverConfig_1.default.TOKEN_SECRET_KEY);
                        }
                        catch (err) {
                            return null;
                        }
                    };
                    checkAuthenticationMiddleware = function (req, res, next) {
                        if (req.headers.authorization) {
                            if (req.headers.authorization === 'unauth') {
                                res.status(401).json({ 'message': 'Выполнен выход из аккаунта' });
                                return;
                            }
                            var decoded = checkAuthentication(req.headers.authorization);
                            if (!decoded) {
                                res.status(403).json({ 'message': 'Пользователь не авторизован' });
                                return;
                            }
                            req.user = decoded;
                            next();
                            return;
                        }
                        res.status(403).json({ 'message': 'Пользователь не авторизован(нет токена)' });
                    };
                    getChatsForUser = function (id) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, chatSchema_1.chatModel.find({ owner: id }).lean()];
                        });
                    }); };
                    wss = new ws_1.default.Server({ port: +serverConfig_1.default.port });
                    wss.on('connection', function (ws) {
                        ws.on('message', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                            var msgParsed;
                            return __generator(this, function (_a) {
                                msgParsed = JSON.parse(msg);
                                if (msgParsed.type === statuses_1.wsTypes.REMEMBER_ME) {
                                    ws.userId = msgParsed.body.userId;
                                }
                                return [2 /*return*/];
                            });
                        }); });
                    });
                    app.use('/chats', checkAuthenticationMiddleware);
                    app.use('/messages', checkAuthenticationMiddleware);
                    app.use('/update', checkAuthenticationMiddleware);
                    app.get('/chats/owner/:ownerid', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var userId, chats, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    userId = req.params.ownerid;
                                    return [4 /*yield*/, getChatsForUser(userId)];
                                case 1:
                                    chats = _a.sent();
                                    res.status(200).json(chats);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске чатов' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/chats/messages/chatid/:chatid', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var chatid, chat, isUserMember, messages, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    chatid = req.params.chatid;
                                    return [4 /*yield*/, chatSchema_1.chatModel.findById({ _id: chatid }).lean()];
                                case 1:
                                    chat = _a.sent();
                                    if (!chat) {
                                        res.status(400).json({ message: 'Ошибка при поиске сообщений' });
                                        return [2 /*return*/];
                                    }
                                    isUserMember = chat.members.find(function (x) { return x.equals(req.user._id); });
                                    return [4 /*yield*/, messageSchema_1.messageModel.find({
                                            _id: { $in: chat.messages },
                                            author: { $in: isUserMember ? chat.members : [req.user._id] },
                                            type: isUserMember ? { $in: Object.values(statuses_1.messageTypes).filter(function (x) { return x !== statuses_1.messageTypes.SYSTEM_TEXT_PRIVATE; }) } : statuses_1.messageTypes.SYSTEM_TEXT_PRIVATE
                                        }).lean()];
                                case 2:
                                    messages = _a.sent();
                                    res.status(200).json(messages);
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_2 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске сообщений' });
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/chats/messages/unreadmessages/chatid/:chatid', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var user_1, chatid, chat, messages, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    user_1 = req.user;
                                    chatid = req.params.chatid;
                                    return [4 /*yield*/, chatSchema_1.chatModel.findById({ _id: chatid }).lean()];
                                case 1:
                                    chat = _a.sent();
                                    if (!chat) return [3 /*break*/, 3];
                                    return [4 /*yield*/, messageSchema_1.messageModel.find({ _id: { $in: chat.messages } }).lean()];
                                case 2:
                                    messages = _a.sent();
                                    messages = messages.filter(function (x) { return !x.whoRead.includes(user_1._id); });
                                    res.status(200).json(messages);
                                    return [2 /*return*/];
                                case 3:
                                    res.status(400).json({ message: 'Ошибка при поиске чата' });
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_3 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске сообщений' });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/chats', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, title, members, creator, type, sharedId_1, createdChat_1, creatorObj_1, existedChat, e_4;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = req.body, title = _a.title, members = _a.members, creator = _a.creator, type = _a.type;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 4, , 5]);
                                    if (!title) {
                                        res.status(400).json({ error: 'Некорректные данные' });
                                        return [2 /*return*/];
                                    }
                                    sharedId_1 = uniqid_1.default();
                                    createdChat_1 = null;
                                    return [4 /*yield*/, userSchema_1.userModel.find({ _id: creator }).lean()];
                                case 2:
                                    creatorObj_1 = _b.sent();
                                    return [4 /*yield*/, chatSchema_1.chatModel.findOne({ members: members, type: statuses_1.chatTypes.DIALOG })];
                                case 3:
                                    existedChat = _b.sent();
                                    if (existedChat && type === statuses_1.chatTypes.DIALOG) {
                                        createdChat_1 = new chatSchema_1.chatModel({
                                            title: title,
                                            members: existedChat.members,
                                            owner: creator,
                                            messages: existedChat.messages,
                                            sharedId: existedChat.sharedId,
                                            type: type,
                                            creator: existedChat.creator
                                        });
                                        createdChat_1.save();
                                    }
                                    else {
                                        members.forEach(function (member) {
                                            var newChat;
                                            if (members.length === 2 && member !== creator) {
                                                newChat = new chatSchema_1.chatModel({
                                                    title: type === statuses_1.chatTypes.DIALOG ? creatorObj_1[0].name : title,
                                                    members: members,
                                                    owner: member,
                                                    messages: [],
                                                    sharedId: sharedId_1,
                                                    type: type,
                                                    creator: creator
                                                });
                                            }
                                            else {
                                                newChat = new chatSchema_1.chatModel({ title: title, members: members, owner: member, messages: [], sharedId: sharedId_1, type: type, creator: creator });
                                            }
                                            newChat.save();
                                            if (creator === member) {
                                                createdChat_1 = newChat;
                                            }
                                        });
                                    }
                                    broadCast(statuses_1.wsTypes.CHATS, null, function (client) { return members.includes(client.userId); });
                                    res.status(200).json(createdChat_1);
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_4 = _b.sent();
                                    res.status(400).json({ message: e_4.message });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.delete('/chats/owner/id/:ownerid/:chatid', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var e_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    if (!(req.params.ownerid && req.params.chatid)) {
                                        res.status(400).json({ error: 'Неверные данные' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, chatSchema_1.chatModel.findOneAndRemove({ _id: req.params.chatid })];
                                case 1:
                                    _a.sent();
                                    res.status(200);
                                    broadCast(statuses_1.wsTypes.CHATS, null, function (client) { return client.userId === req.params.ownerid; });
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_5 = _a.sent();
                                    res.status(400).json({ error: 'Не удалось удалить чат' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/chats/shared/:sharedid/message', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var sharedid, _a, author, authorName, text, dateSend, forwardMessages, isForward, type, content, message, sharedChats, chat, _i, sharedChats_1, e_6;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 7, , 8]);
                                    sharedid = req.params.sharedid;
                                    _a = req.body, author = _a.author, authorName = _a.authorName, text = _a.text, dateSend = _a.dateSend, forwardMessages = _a.forwardMessages, isForward = _a.isForward, type = _a.type, content = _a.content;
                                    if (!author && (!forwardMessages && !text)) {
                                        res.status(400).json({ message: 'Не передан текст сообщения (text) или имя автора (author)' });
                                        return [2 /*return*/];
                                    }
                                    message = new messageSchema_1.messageModel({
                                        text: text || ' ',
                                        dateSend: dateSend,
                                        author: author,
                                        authorName: authorName,
                                        content: content,
                                        isForward: isForward,
                                        type: type || statuses_1.messageTypes.TEXT,
                                        forwardMessages: forwardMessages || [],
                                        whoRead: [author]
                                    });
                                    return [4 /*yield*/, message.save()];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, chatSchema_1.chatModel.find({ sharedId: sharedid })];
                                case 2:
                                    sharedChats = _b.sent();
                                    chat = void 0;
                                    _i = 0, sharedChats_1 = sharedChats;
                                    _b.label = 3;
                                case 3:
                                    if (!(_i < sharedChats_1.length)) return [3 /*break*/, 6];
                                    chat = sharedChats_1[_i];
                                    chat.messages.push(message._id);
                                    return [4 /*yield*/, chat.save()];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 3];
                                case 6:
                                    broadCast(statuses_1.wsTypes.MESSAGE, {
                                        sharedId: sharedid
                                    }, function () { return true; });
                                    res.status(200).json(message);
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_6 = _b.sent();
                                    res.status(500).json({ error: 'Не удалось сохранить сообщение в БД' });
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/chats/shared/message/updateStatus/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var user, _a, sharedId, isRead, sharedChats, messagesIds, messages, mes, _i, messages_1, e_7;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 7, , 8]);
                                    user = req.user;
                                    _a = req.body, sharedId = _a.sharedId, isRead = _a.isRead;
                                    if (!sharedId) {
                                        res.status(400).json({ message: 'Не передан статус' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, chatSchema_1.chatModel.find({ sharedId: sharedId }).lean()];
                                case 1:
                                    sharedChats = _b.sent();
                                    messagesIds = Array.from(new Set(sharedChats.map(function (ch) { return ch.messages; }).flat()));
                                    return [4 /*yield*/, messageSchema_1.messageModel.find({ _id: { $in: messagesIds } })];
                                case 2:
                                    messages = _b.sent();
                                    mes = void 0;
                                    _i = 0, messages_1 = messages;
                                    _b.label = 3;
                                case 3:
                                    if (!(_i < messages_1.length)) return [3 /*break*/, 6];
                                    mes = messages_1[_i];
                                    if (!(mes.author !== user._id && isRead && !mes.whoRead.includes(user._id))) return [3 /*break*/, 5];
                                    mes.whoRead = __spreadArrays(mes.whoRead, [user._id]);
                                    return [4 /*yield*/, mes.save()];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 3];
                                case 6:
                                    broadCast(statuses_1.wsTypes.MESSAGE, {
                                        sharedId: sharedId
                                    }, function () { return true; });
                                    res.status(200).json({ message: 'Данные обновлены' });
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_7 = _b.sent();
                                    console.log(e_7.message);
                                    res.status(500).json({ error: 'Не удалось сохранить сообщение в БД' });
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.delete('/chats/chat/message/:chatid/message', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var chatid, messageId_1, chat, e_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    chatid = req.params.chatid;
                                    messageId_1 = req.body.messageId;
                                    if (!messageId_1) {
                                        res.status(400).json({ message: 'Не передан messageId' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, chatSchema_1.chatModel.findOne({ _id: chatid })];
                                case 1:
                                    chat = _a.sent();
                                    if (!chat) return [3 /*break*/, 3];
                                    chat.messages = chat.messages.filter(function (m) { return !m.equals(messageId_1); });
                                    return [4 /*yield*/, chat.save()];
                                case 2:
                                    _a.sent();
                                    res.status(200).json({ message: 'Удалено' });
                                    broadCast(statuses_1.wsTypes.MESSAGE, {
                                        sharedId: chat.sharedId
                                    }, function () { return true; });
                                    return [2 /*return*/];
                                case 3:
                                    res.status(500).json({ error: 'Не удалось удалить сообщение из БД' });
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_8 = _a.sent();
                                    res.status(500).json({ error: 'Не удалось удалить сообщение из БД' });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.delete('/chats/chat/message/many/:chatid/message', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var chatid, messageIdsArr_1, chat, e_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    chatid = req.params.chatid;
                                    messageIdsArr_1 = req.body.messageIdsArr;
                                    if (!messageIdsArr_1) {
                                        res.status(400).json({ message: 'Не передан messageIds' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, chatSchema_1.chatModel.findOne({ _id: chatid })];
                                case 1:
                                    chat = _a.sent();
                                    if (!chat) return [3 /*break*/, 3];
                                    chat.messages = chat.messages.filter(function (m) { return !messageIdsArr_1.find(function (m1) { return m.equals(m1); }); });
                                    return [4 /*yield*/, chat.save()];
                                case 2:
                                    _a.sent();
                                    res.status(200).json({ message: 'Удалено' });
                                    broadCast(statuses_1.wsTypes.MESSAGE, {
                                        sharedId: chat.sharedId
                                    }, function () { return true; });
                                    return [2 /*return*/];
                                case 3:
                                    res.status(500).json({ error: 'Не удалось удалить сообщения из БД' });
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_9 = _a.sent();
                                    res.status(500).json({ error: 'Не удалось удалить сообщения из БД' });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/chats/chat/:chatid', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var chatId, chat, e_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    chatId = req.params.chatid;
                                    return [4 /*yield*/, chatSchema_1.chatModel.findById({ _id: chatId }).lean()];
                                case 1:
                                    chat = _a.sent();
                                    res.status(200).json(chat);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_10 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске чатов' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/chats/title/:ownerid/:title', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var chats, e_11;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, chatSchema_1.chatModel.find({ title: { $regex: ".*" + req.params.title + ".*", $options: 'i' }, owner: req.params.ownerid }).lean()];
                                case 1:
                                    chats = _a.sent();
                                    res.status(200).json(chats);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_11 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске чата' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/chats/member/:memberid', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var memberid, chats, e_12;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    memberid = req.params.memberid;
                                    return [4 /*yield*/, chatSchema_1.chatModel.find({ members: [memberid] }).lean()];
                                case 1:
                                    chats = _a.sent();
                                    res.status(200).json(chats);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_12 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске чата' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/users/name/:name', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var name, users, e_13;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    name = req.params.name;
                                    return [4 /*yield*/, userSchema_1.userModel.find({ 'name': { $regex: ".*" + name + ".*", $options: 'i' } }).lean()];
                                case 1:
                                    users = _a.sent();
                                    res.status(200).json(users);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_13 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/users/idrange/:idrange', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var range, usersIds, users, e_14;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    range = req.params.idrange;
                                    usersIds = range.split('-');
                                    return [4 /*yield*/, userSchema_1.userModel.find({ _id: { $in: usersIds } }).lean()];
                                case 1:
                                    users = _a.sent();
                                    res.status(200).json(users);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_14 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/users/user/friends/ownerid/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var id, user, friends, e_15;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    id = req.params.id;
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ _id: id }).lean()];
                                case 1:
                                    user = _a.sent();
                                    if (!user) return [3 /*break*/, 3];
                                    return [4 /*yield*/, userSchema_1.userModel.find({ _id: { $in: user.subscriptions }, subscriptions: { $elemMatch: { $eq: user._id } } }).lean()];
                                case 2:
                                    friends = _a.sent();
                                    res.status(200).json(friends);
                                    return [2 /*return*/];
                                case 3:
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_15 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/users/user/subscribers/ownerid/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var id, user_2, subscribers, e_16;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    id = req.params.id;
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ _id: id }).lean()];
                                case 1:
                                    user_2 = _a.sent();
                                    if (!user_2) return [3 /*break*/, 3];
                                    return [4 /*yield*/, userSchema_1.userModel.find({ subscriptions: { $elemMatch: { $eq: user_2._id } } }).lean()];
                                case 2:
                                    subscribers = _a.sent();
                                    subscribers = subscribers.filter(function (x) { return !user_2.subscriptions.some(function (s) { return s.equals(x._id); }); });
                                    res.status(200).json(subscribers);
                                    return [2 /*return*/];
                                case 3:
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_16 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/users/user/subscriptions/ownerid/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var id, user_3, subscriptions, e_17;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    id = req.params.id;
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ _id: id }).lean()];
                                case 1:
                                    user_3 = _a.sent();
                                    if (!user_3) return [3 /*break*/, 3];
                                    return [4 /*yield*/, userSchema_1.userModel.find({ _id: { $in: user_3.subscriptions } }).lean()];
                                case 2:
                                    subscriptions = _a.sent();
                                    subscriptions = subscriptions.filter(function (x) { return !user_3.subscribers.some(function (s) { return s.equals(x._id); }); });
                                    res.status(200).json(subscriptions);
                                    return [2 /*return*/];
                                case 3:
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_17 = _a.sent();
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/users/user/friends', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, userId, friendId, user, potentialFriend, friendMongoId, userMongoId, e_18;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = req.body, userId = _a.userId, friendId = _a.friendId;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 7, , 8]);
                                    if (!userId || !friendId) {
                                        res.status(400).json({ error: 'Некорректные данные' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ _id: userId })];
                                case 2:
                                    user = _b.sent();
                                    if (!user) return [3 /*break*/, 6];
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ _id: friendId })];
                                case 3:
                                    potentialFriend = _b.sent();
                                    if (!potentialFriend) {
                                        res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                        return [2 /*return*/];
                                    }
                                    friendMongoId = new mongoose_1.default.Types.ObjectId(friendId);
                                    userMongoId = new mongoose_1.default.Types.ObjectId(userId);
                                    if (!user.subscriptions.includes(friendMongoId)) {
                                        user.subscriptions.push(friendMongoId);
                                    }
                                    if (!potentialFriend.subscribers.includes(userMongoId)) {
                                        potentialFriend.subscribers.push(userMongoId);
                                    }
                                    return [4 /*yield*/, user.save()];
                                case 4:
                                    _b.sent();
                                    return [4 /*yield*/, potentialFriend.save()];
                                case 5:
                                    _b.sent();
                                    broadCast(statuses_1.wsTypes.CONTACTS, null, function (client) { return userId === client.userId || friendId === client.userId; });
                                    res.status(200).json(user);
                                    return [2 /*return*/];
                                case 6:
                                    res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_18 = _b.sent();
                                    res.status(400).json({ message: e_18.message });
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.delete('/users/user/friends', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, userId, friendId, user, potentialFriend, e_19;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = req.body, userId = _a.userId, friendId = _a.friendId;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 6, , 7]);
                                    if (!userId || !friendId) {
                                        res.status(400).json({ error: 'Некорректные данные' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ _id: userId })];
                                case 2:
                                    user = _b.sent();
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ _id: friendId })];
                                case 3:
                                    potentialFriend = _b.sent();
                                    if (!user || !potentialFriend) {
                                        res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                        return [2 /*return*/];
                                    }
                                    user.subscriptions = user.subscriptions.filter(function (x) { return !x.equals(friendId); });
                                    potentialFriend.subscribers = potentialFriend.subscribers.filter(function (x) { return !x.equals(userId); });
                                    return [4 /*yield*/, user.save()];
                                case 4:
                                    _b.sent();
                                    return [4 /*yield*/, potentialFriend.save()];
                                case 5:
                                    _b.sent();
                                    broadCast(statuses_1.wsTypes.CONTACTS, null, function (client) { return userId === client.userId || friendId === client.userId; });
                                    res.status(200).json(user);
                                    return [3 /*break*/, 7];
                                case 6:
                                    e_19 = _b.sent();
                                    res.status(400).json({ message: e_19.message });
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/update/user/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var gotUser, _a, name, age, sex, avatarUrl, city, country, familyStatus, user, e_20;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 3, , 4]);
                                    gotUser = req.user;
                                    _a = req.body, name = _a.name, age = _a.age, sex = _a.sex, avatarUrl = _a.avatarUrl, city = _a.city, country = _a.country, familyStatus = _a.familyStatus;
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ _id: gotUser._id })];
                                case 1:
                                    user = _b.sent();
                                    if (!user) {
                                        res.status(400).json({ message: 'Ошибка при поиске пользователей' });
                                        return [2 /*return*/];
                                    }
                                    user.name = name;
                                    user.age = age;
                                    user.sex = sex;
                                    user.city = city;
                                    user.country = country;
                                    user.familyStatus = familyStatus;
                                    user.avatarUrl = avatarUrl;
                                    return [4 /*yield*/, user.save()];
                                case 2:
                                    _b.sent();
                                    res.status(200).json(__assign(__assign({}, user._doc), { password: undefined, token: jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(user._doc)), serverConfig_1.default.TOKEN_SECRET_KEY) }));
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_20 = _b.sent();
                                    res.status(400).json({ message: 'Ошибка при обновлении данных' });
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/update/chat/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, newParams, sharedChatId, chats_2, ch, _i, chats_1, allMembers_1, e_21;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = req.body, newParams = _a.newParams, sharedChatId = _a.sharedChatId;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 7, , 8]);
                                    if (!sharedChatId || !newParams) {
                                        res.status(400).json({ error: 'Некорректные данные' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, chatSchema_1.chatModel.find({ sharedId: sharedChatId })];
                                case 2:
                                    chats_2 = _b.sent();
                                    Object.keys(newParams).forEach(function (key) {
                                        chats_2.forEach(function (ch) {
                                            ch[key] = newParams[key];
                                        });
                                    });
                                    ch = void 0;
                                    _i = 0, chats_1 = chats_2;
                                    _b.label = 3;
                                case 3:
                                    if (!(_i < chats_1.length)) return [3 /*break*/, 6];
                                    ch = chats_1[_i];
                                    return [4 /*yield*/, ch.save()];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 3];
                                case 6:
                                    allMembers_1 = Array.from(new Set(chats_2.map(function (x) { return x.members; }).flat()));
                                    broadCast(statuses_1.wsTypes.CHATS, null, function (client) { return !!allMembers_1.find(function (x) { return x.equals(client.userId); }); });
                                    res.status(200).json(chats_2.find(function (ch) { return ch.owner.equals(req.user._id); }));
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_21 = _b.sent();
                                    res.status(400).json({ message: 'Ошибка при обновлении данных' });
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); });
                    genders = ['Мужской', 'Женский'];
                    familyStatuses = ['Женат(Замужем)', 'Свободен(а)'];
                    app.post('/register', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, email, name, password, age, sex, avatarUrl, country, city, familyStatus, candidate, user, e_22;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 3, , 4]);
                                    _a = req.body, email = _a.email, name = _a.name, password = _a.password, age = _a.age, sex = _a.sex, avatarUrl = _a.avatarUrl, country = _a.country, city = _a.city, familyStatus = _a.familyStatus;
                                    if (!email || !password || (sex && !genders.includes(sex)) || (familyStatus && !familyStatuses.includes(familyStatus))) {
                                        res.status(400).json({ message: 'Неверные регистрационные данные' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, userSchema_1.userModel.find({ $or: [{ name: name }, { email: email }] }).lean()];
                                case 1:
                                    candidate = _b.sent();
                                    if (candidate.length) {
                                        res.status(400).json({ message: 'Почта или имя уже задействованы' });
                                        return [2 /*return*/];
                                    }
                                    user = new userSchema_1.userModel({ email: email, name: name, password: password, friends: [], age: age, sex: sex, avatarUrl: avatarUrl || '', country: country, city: city, familyStatus: familyStatus });
                                    return [4 /*yield*/, user.save()];
                                case 2:
                                    _b.sent();
                                    res.status(201).json(user);
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_22 = _b.sent();
                                    res.status(400).json({ message: 'Ошибка при регистрации' });
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/auth', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, email, password, user, plainUser, e_23;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = req.body, email = _a.email, password = _a.password;
                                    if (!email || !password) {
                                        res.status(400).json({ message: 'Не передан email или password' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, userSchema_1.userModel.findOne({ email: email })];
                                case 1:
                                    user = _b.sent();
                                    if (!user) {
                                        res.status(401).json({ message: 'Пользователь не найден' });
                                        return [2 /*return*/];
                                    }
                                    if (!user.validatePassword(password)) {
                                        res.status(401).json({ message: 'Неправильный логин/пароль' });
                                        return [2 /*return*/];
                                    }
                                    plainUser = JSON.parse(JSON.stringify(user));
                                    delete plainUser.password;
                                    res.status(201).json(__assign(__assign({}, plainUser), { token: jsonwebtoken_1.default.sign(plainUser, serverConfig_1.default.TOKEN_SECRET_KEY) }));
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_23 = _b.sent();
                                    res.status(400).json({ message: 'Ошибка при авторизации' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('*', function (req, res) {
                        res.status(404).json({ 'message': 'Page not found' });
                    });
                    app.listen(serverConfig_1.default.portHttp, function () {
                        console.log('Serverstarted!');
                        console.log('http://localhost:4001');
                    });
                    return [2 /*return*/];
            }
        });
    });
}
start();
