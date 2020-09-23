const {Schema, model} = require ('mongoose');

const messageSchema = new Schema({
    text: {type: String, required: true},
    isRead: {type: Boolean, required: true, default: false},
    dateSend: {type: Number, required: true},
    dateDelivered: {type: Number},
    dateRead: {type: Number},
    id: {type: String, required: true, unique: true},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    readers: [{ type: Schema.Types.ObjectId, ref: 'User' }],//для бесед массив кто получает сообщение
});

module.exports = model('Message', messageSchema, 'messages');
