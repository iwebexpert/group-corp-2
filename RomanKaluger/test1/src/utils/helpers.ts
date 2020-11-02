import {userTypes} from "../components/messenger/ContactsDialogPanel/userTypes";
import {IUser} from "../types/globalTypes";

export function disableBtn(btn: HTMLDivElement): void {
    btn.classList.add('disabled')
}

export function activateBtn(btn: HTMLDivElement): void {
    btn.classList.remove('disabled')
}

export function categorizeUser(user: IUser, curUser: IUser): userTypes {
    if (user.subscribers.includes(curUser._id) && user.subscriptions.includes(curUser._id)) {
        return userTypes.FRIEND;
    }
    if (user.subscribers.includes(curUser._id) && !user.subscriptions.includes(curUser._id)) {
        return userTypes.SUBSCRIPTIONS;
    }
    if (!user.subscribers.includes(curUser._id) && user.subscriptions.includes(curUser._id)) {
        return userTypes.SUBSCRIBERS;
    }
    return userTypes.OTHER;
}

export function getUserNote(type: userTypes, user: IUser): string {
    let str: string = user.name;
    switch (type) {
        case userTypes.FRIEND:
            str += ' у вас в друзьях';
            break;
        case userTypes.SUBSCRIBERS:
            str += ' у вас в подписчиках';
            break;
        case userTypes.SUBSCRIPTIONS:
            str += ' у вас в подписках';
            break;
        default:
            str = '';
    }
    return str;
}

export function convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise(resolve => {
        const fileReader: FileReader = new FileReader();
        fileReader.onload = function (this: FileReader): void {
            resolve(this.result as string);
        };
        fileReader.readAsDataURL(blob);
    });
}

