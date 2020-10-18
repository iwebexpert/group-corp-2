import connectionConfig from "../../configs/connectionConfig";
import {DbWorker} from "../../utils/DbWorker";
import {sendMessage} from "../actions";

const petyaTimeOut = {};
export const botMiddleware = store => next => action => {
    if(action.type === sendMessage().type){
        const {msg} = action.payload;
        const {chats, selectedChat, curUser} = store.getState().app;
        const chat = chats.find(ch => ch._id === selectedChat);
        if (msg.author !== '5f79fd1a432d496ad47f39d1' && chat.members.includes('5f79fd1a432d496ad47f39d1')){
            clearTimeout(petyaTimeOut[chat._id]);
            petyaTimeOut[chat._id] = setTimeout(async () => {
                    DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/shared/${chat.sharedId}/message`, {
                        text: `Привет, ${curUser.name}, я Петя-бот`,
                        dateSend: Date.now(),
                        author: '5f79fd1a432d496ad47f39d1',
                        authorName: 'Петя',
                        forwardMessages:[],
                        isForward: false
                    });

            },5000);
        }
    }
    return next(action);
};
