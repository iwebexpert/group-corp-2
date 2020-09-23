import config from "../configs/connectionConfig";
import {changeWsStatus} from "../redux/actions";
import {wsStatuses} from "../configs/statuses";
import {store} from "../redux/StorageRedux";

export function initializeApp() {
    const dispatch = store.dispatch;
    const ws = new WebSocket(config.host);
    ws.onopen = () => {
        dispatch(changeWsStatus(wsStatuses.OPENED))
    };
    ws.onclose = () => {
        dispatch(changeWsStatus(wsStatuses.CLOSED))
    };
    config.ws = ws;
}
