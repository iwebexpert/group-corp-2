import {Reducer} from 'redux';
import {setActiveChat, ChahgeActionTypes} from '../actions/changeActiveChat';

const activeChatReducer: Reducer<string, setActiveChat> = (state = '', action) => {
	switch (action.type) {
		case ChahgeActionTypes.UPDATE_ACTIVE_CHAT:
			return action.id;			
		default:
			return state;
	}
};
export default activeChatReducer;
