const {Schema, model} = require ('mongoose');

const messageSchema = new Schema({
    text: {type: String, required: true},
    isRead: {type: Boolean, required: true, default: false},
    dateSend: {type: Number, required: true},
    dateDelivered: {type: Number},
    dateRead: {type: Number},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String},
    isForward: {type: Boolean, default: false},
    forwardMessages: [{type: Object}]
});
module.exports = model('Message', messageSchema, 'messages');
