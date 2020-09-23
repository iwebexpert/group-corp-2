const wsTypes = require("./config/statuses").wsTypes;
const WebSocket = require('ws');
const config = require('./config/serverConfig');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqid = require('uniqid');

const wss = new WebSocket.Server({ port: config.port });

const messageModel = require('./models/chats');
const userModel = require('./models/users');

mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const checkAuthentication = (ws, msg) => {
        const [type, token] = msg.body.token;
        jwt.verify(token, config.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                ws.send(JSON.stringify({
                    type: wsTypes.ERROR,
                    body: {
                        errorMessage: 'Ошибка авторизации',
                    }
                }));
                return false;
            }
            return true;
        })
};

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        switch (message.type) {
            case wsTypes.AUTH:{
                const {email, password} = message.body;
                if(!email || !password){
                    ws.send(JSON.stringify({
                        type: wsTypes.ERROR,
                        body: {
                            errorMessage: 'Ошибка авторизации',
                        }
                    }));
                    return;
                }
                const user = await userModel.findOne({email});
                if(!user){
                    ws.send(JSON.stringify({
                        type: wsTypes.ERROR,
                        body: {
                            errorMessage: 'Пользователь не найден',
                        }
                    }));
                    return;
                }

                if(!user.validatePassword(password)){
                    ws.send(JSON.stringify({
                        type: wsTypes.ERROR,
                        body: {
                            errorMessage: 'Неверные данные',
                        }
                    }));
                    return;
                }
                const plainUser = JSON.parse(JSON.stringify(user));
                delete plainUser.password;
                ws.send(JSON.stringify({
                    type: wsTypes.ERROR,
                    body: {
                        errorMessage: 'Пользователь не найден',
                    }
                }));
                ws.send(JSON.stringify({
                    type: wsTypes.AUTH_SUCCESS,
                    body: {
                        ...plainUser,
                        token: jwt.sign(plainUser, config.TOKEN_SECRET_KEY)
                    }
                }));
                break;
            }
            case wsTypes.REGISTER:{
                const {email, name, password} = message.body;
                if(!email || !password){
                    ws.send(JSON.stringify({
                        type: wsTypes.ERROR,
                        body: {
                            errorMessage: 'Ошибка регистрации',
                        }
                    }));
                    return;
                }
                const user = new userModel({email, name, password, id: uniqid()});
                await user.save();
                break;
            }
            case wsTypes.MESSAGE:{
                break;

            }
        }
    });
    ws.send('something');
});
