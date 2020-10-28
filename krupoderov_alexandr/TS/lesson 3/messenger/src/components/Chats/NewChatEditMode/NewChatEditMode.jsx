import React, {useState} from 'react';
import styles from './NewChatEditMode.module.css';

export const NewChatEditMode = ({changeEditMode, addChat}) => {
	const [newChatText, changeNewChatTextState] = useState('');

	const saveChat = () => {
		if (!newChatText){
			alert('Введите имя чата');
			return;
		}
		addChat(newChatText);
	};

	const changeNewChatText = (event) => {
		changeNewChatTextState(event.target.value);
	};

	const onClickHandler = (event) => {
		if (event.target.tagName === 'TEXTAREA' || event.target.tagName !== 'BUTTON'){
			changeEditMode(false);
		}
	};

	return (
		<div className={styles.root} onClick={onClickHandler}>
			<textarea autoFocus
					  className={styles.text}
					  onChange={changeNewChatText}
					  value={newChatText}
					  placeholder='Введите имя чата'/>
			<button className={styles.btn} onClick={saveChat}>Сохранить</button>
		</div>
	);
};

export default NewChatEditMode;