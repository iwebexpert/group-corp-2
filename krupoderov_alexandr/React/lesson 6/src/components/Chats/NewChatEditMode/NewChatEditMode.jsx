import React from 'react';
import {withStyles} from "@material-ui/core";
import styles from './NewChatEditMode.module.css';

class NewChatEditMode extends React.Component {
	state = {
		newChatText: ''
	};

	saveChat = () => {
		if (!this.state.newChatText){
			alert('Введите имя чата');
			return;
		}
		this.props.addChat(this.state.newChatText);
	};

	changeNewChatText = (event) => {
		this.setState({
			newChatText: event.target.value
		})
	}

	onClickHandler = (event) => {
		if (event.target.tagName === 'TEXTAREA' || event.target.tagName !== 'BUTTON'){
			this.props.changeEditMode(false)
		}
	};

	render() {
		return (
			<div className={styles.root} onClick={this.onClickHandler}>
				<textarea autoFocus className={styles.text} onChange={this.changeNewChatText} value={this.state.newChatText} placeholder='Введите имя чата'/>
				<button className={styles.btn} onClick={this.saveChat}>Сохранить</button>
			</div>
		);
	};
}

export default NewChatEditMode;