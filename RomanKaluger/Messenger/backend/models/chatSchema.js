const {Schema, model} = require ('mongoose');

const chatSchema = new Schema({
    title: {type: String, required: true},
    members: [{ type: Schema.Types.ObjectId, ref: 'User',required: true}],
    owner: { type: Schema.Types.ObjectId, ref: 'User',required: true},
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    sharedId: {type: String, required: true}
});

module.exports = model('Chat', chatSchema, 'chats');
