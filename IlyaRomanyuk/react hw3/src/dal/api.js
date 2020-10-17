import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const chatsAPI = {
    getChats() {
        return instance.get(`chats?_embed=messages`)
    },

    addChat(title, image, fire, messages) {
        return instance.post(`chats`, { title, image, fire, messages });
    },

    deleteChat(chatId) {
        return instance.delete(`chats/${chatId}`);
    },

    addMessage(chatId, message) {
        return instance.post(`messages`, { ...message, chatId });
    },

    deleteMessage(messageId) {
        return instance.delete(`messages/${messageId}`);
    }
}

export const profileAPI = {
    getProfile() {
        return instance.get(`person`)
    }
}