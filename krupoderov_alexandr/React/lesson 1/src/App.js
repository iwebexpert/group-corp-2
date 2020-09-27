import React from 'react';
import Messages from './components/Messages/Messages.js';
import ButtonSendMessages from './components/ButtonSendMessage/ButtonSendMessages';

const App = (props) => {
	return (
		<>
			<Messages messages={props.messages}/>
			<ButtonSendMessages dispatch={props.dispatch}>Я нажаль!</ButtonSendMessages>
		</>
	)
}


export default App;