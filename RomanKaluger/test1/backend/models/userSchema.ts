import {Schema, model, Document, Model, HookNextFunction, SchemaDefinition, Types} from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS: number = 10;
interface IUserRaw {
    email: string;
    name: string;
    password?: string;
    subscriptions: Types.ObjectId[];
    subscribers: Types.ObjectId[];
    age: number;
    sex: string;
    avatarUrl:  string;
    country: string;
    city:  string;
    familyStatus:  string;
}
export interface IUser extends IUserRaw{
    _id: Types.ObjectId;
}
export interface IUserDoc extends Document,IUserRaw{
    _doc: Document;
    validatePassword(password: string): boolean;
}

const userSchema: Schema<SchemaDefinition> = new Schema({
    email: {type: String, required: true},
    name: {type: String, default: "Guest"},
    password: {type: String, required: true},
    subscriptions:[{type: Schema.Types.ObjectId, ref: 'User'}],
    subscribers:[{type: Schema.Types.ObjectId, ref: 'User'}],
    age: {type: Number, required: false},
    sex: {type: String, required: false},
    avatarUrl:  {type: String, required: false},
    country:  {type: String, required: false},
    city:  {type: String, required: false},
    familyStatus:  {type: String, required: false},
});

userSchema.pre<IUserDoc>('save', function(next: HookNextFunction): void {
    if(this.isModified('password')){
        const salt: string = bcrypt.genSaltSync(SALT_ROUNDS);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
});

userSchema.methods.validatePassword = function(password: string): boolean{
    return bcrypt.compareSync(password, (this.password as unknown as string));
};

export const userModel: Model<IUserDoc> = model('User', userSchema, 'users');
