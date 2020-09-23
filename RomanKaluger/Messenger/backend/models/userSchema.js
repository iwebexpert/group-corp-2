const {Schema, model} = require ('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, default: "Guest"},
    password: {type: String, required: true},
    id: {type: String, required: true, unique: true}
});

userSchema.pre('save', function(next) {
    if(this.isModified('password')){
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
});

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


module.exports = model('User', userSchema, 'users');
