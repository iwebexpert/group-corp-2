import config from "../configs/connectionConfig";
import {changeWsStatus} from "../redux/actions";
import {store} from "../redux/StorageRedux";
import {wsStatus} from "../configs/statuses";
import {IUser} from "../types/globalTypes";
import {Dispatch} from "redux";
import {CommonAction} from "../redux/reduxTypes/rdxActions";

export function initializeWs(user: IUser): void {
    const dispatch: Dispatch<CommonAction> = store.dispatch;
    const ws: WebSocket = new WebSocket(config.host);
    ws.onopen = (): void => {
        dispatch(changeWsStatus(wsStatus.OPENED));
        ws.send(JSON.stringify({
            type: 'REMEMBER_ME',
            body: {
                userId: user._id
            }
        }));
    };
    ws.onclose = (): void => {
        dispatch(changeWsStatus(wsStatus.CLOSED));
    };
    config.ws = ws;
}
