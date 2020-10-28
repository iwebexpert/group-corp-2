import {SchemaDefinition, Schema, model, Document, Model, Types} from "mongoose";
import {messageTypes}  from '../config/statuses';
export interface IMessage {
    text: string;
    whoRead: Types.ObjectId[];
    dateSend: number;
    dateDelivered: number;
    dateRead: number;
    author: Types.ObjectId;
    authorName: string;
    isForward: boolean;
    type: messageTypes;
    content: object;
    forwardMessages:object[];
}
export interface IMessageDoc extends IMessage,Document{}
const messageSchema: Schema<SchemaDefinition> = new Schema({
    text: {type: String, required: true},
    whoRead: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
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
export const messageModel: Model<IMessageDoc> =  model('Message', messageSchema, 'messages');
