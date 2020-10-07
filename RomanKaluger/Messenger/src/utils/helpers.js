import {userTypes} from "../components/messenger/ContactsDialogPanel/userTypes";

export function disableBtn(btn) {
    btn.classList.add('disabled')
}
export function activateBtn(btn) {
    btn.classList.remove('disabled')
}
export function categorizeUser (user, curUser) {
    if (user.subscribers.includes(curUser._id) && user.subscriptions.includes(curUser._id)){
        return userTypes.FRIEND;
    }
    if (user.subscribers.includes(curUser._id) && !user.subscriptions.includes(curUser._id)){
        return userTypes.SUBSCRIPTIONS;
    }
    if (!user.subscribers.includes(curUser._id) && user.subscriptions.includes(curUser._id)){
        return userTypes.SUBSCRIBERS;
    }
    return userTypes.OTHER;
}
export function getUserNote(type, user) {
    let str = user.name;
    switch (type) {
        case userTypes.FRIEND: str += ' у вас в друзьях'; break;
        case userTypes.SUBSCRIBERS: str += ' у вас в подписчиках'; break;
        case userTypes.SUBSCRIPTIONS: str += ' у вас в подписках'; break;
        default: str = '';
    }
    return str;
}

