import React from 'react';
import ChatItem from './ChatItem/ChatItem';
import makeStyles from '@material-ui/core/styles/makeStyles';

const styles = makeStyles(theme => ({
	root: {
		background: '#2e364a',
		height: '100%'
	}
}));

const Chats = (props) => {
	let classes = styles();
	let chatsArray = props.chats.map(c => <ChatItem key={c.id} name={c.name} photoUrl={c.photoUrl}/>);
	return (
		<div className={classes.root}>
			{chatsArray}
		</div>
	);
};

export default Chats;