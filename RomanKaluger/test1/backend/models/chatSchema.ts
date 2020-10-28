import {SchemaDefinition, Schema, model, Model, Document, Types} from "mongoose";


export interface IChatDoc extends Document{
    title: string;
    members: Types.ObjectId[];
    owner: Types.ObjectId ;
    messages: Types.ObjectId[];
    sharedId: string;
    type: string;
    creator: string;
    [key: string]: any
}
const chatSchema: Schema<SchemaDefinition>  = new Schema({
    title: {type: String, required: true},
    members: [{ type: Schema.Types.ObjectId, ref: 'User',required: true}],
    owner: { type: Schema.Types.ObjectId, ref: 'User',required: true},
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    sharedId: {type: String, required: true},
    type: {type: String, required:true},
    creator: {type: String, required:true},
});

export const chatModel: Model<IChatDoc> = model('Chat', chatSchema, 'chats');
