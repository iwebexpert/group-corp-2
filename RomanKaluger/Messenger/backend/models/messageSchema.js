const {Schema, model} = require ('mongoose');
const {messageTypes} = require('./../config/statuses');
const messageSchema = new Schema({
    text: {type: String, required: true},
    isRead: {type: Boolean, required: true, default: false},
    dateSend: {type: Number, required: true},
    dateDelivered: {type: Number},
    dateRead: {type: Number},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String},
    isForward: {type: Boolean, default: false},
    type: {type: String, default: messageTypes.TEXT, required: true},
    content: {type: Object, default: null},
    forwardMessages: [{type: Object}]
});
module.exports = model('Message', messageSchema, 'messages');
