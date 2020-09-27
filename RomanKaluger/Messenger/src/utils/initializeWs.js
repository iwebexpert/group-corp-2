import config from "../configs/connectionConfig";
import {changeWsStatus} from "../redux/actions";
import {store} from "../redux/StorageRedux";
import {wsStatuses} from "../configs/statuses";

export function initializeWs(user) {
    const dispatch = store.dispatch;
    const ws = new WebSocket(config.host);
    ws.onopen = () => {
        dispatch(changeWsStatus(wsStatuses.OPENED));
        ws.send(JSON.stringify({
            type: 'REMEMBER_ME',
            body: {
                userId: user._id
            }
        }));
    };
    ws.onclose = () => {
        dispatch(changeWsStatus(wsStatuses.CLOSED));
    };
    config.ws = ws;
}
