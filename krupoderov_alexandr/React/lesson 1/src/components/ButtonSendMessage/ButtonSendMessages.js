import React from 'react';
import {addMessage} from '../../mini-store/store';

const ButtonSendMessages = (props) => {
	const addMessageHandler = () => {
		props.dispatch(addMessage(props.children))
	}
	return(
		<button onClick={addMessageHandler}>{props.children}</button>
	)
}

export default ButtonSendMessages;