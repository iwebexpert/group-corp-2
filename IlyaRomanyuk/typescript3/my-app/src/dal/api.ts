import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/'
})

export const chatsAPI = {
    getChats() {
        return instance.get(`chats?_embed=messages`)
    },

    addChat(title: string, image: string, fire: boolean, messages: any) {
        return instance.post(`chats`, { title, image, fire, messages });
    },

    deleteChat(chatId: number) {
        return instance.delete(`chats/${chatId}`);
    },

    addMessage(chatId: number, message: Message) {
        return instance.post(`messages`, { ...message, chatId });
    },

    deleteMessage(messageId: string) {
        return instance.delete(`messages/${messageId}`);
    }
}

export const profileAPI = {
    getProfile() {
        return instance.get(`person`)
    }
}