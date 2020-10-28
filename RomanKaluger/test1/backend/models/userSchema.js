"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var SALT_ROUNDS = 10;
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: { type: String, default: "Guest" },
    password: { type: String, required: true },
    subscriptions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    subscribers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    age: { type: Number, required: false },
    sex: { type: String, required: false },
    avatarUrl: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    familyStatus: { type: String, required: false },
});
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        var salt = bcrypt_1.default.genSaltSync(SALT_ROUNDS);
        this.password = bcrypt_1.default.hashSync(this.password, salt);
    }
    next();
});
userSchema.methods.validatePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password);
};
exports.userModel = mongoose_1.model('User', userSchema, 'users');
