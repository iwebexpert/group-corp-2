import config from "../configs/connectionConfig";
import {changeWsStatus} from "../redux/actions";
import {store} from "../redux/StorageRedux";
import {wsStatus} from "../configs/statuses";

export function initializeWs(user) {
    const dispatch = store.dispatch;
    const ws = new WebSocket(config.host);
    ws.onopen = () => {
        dispatch(changeWsStatus(wsStatus.OPENED));
        ws.send(JSON.stringify({
            type: 'REMEMBER_ME',
            body: {
                userId: user._id
            }
        }));
    };
    ws.onclose = () => {
        dispatch(changeWsStatus(wsStatus.CLOSED));
    };
    config.ws = ws;
}
