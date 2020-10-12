import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = makeStyles(theme => ({
	root: {
		color: 'white',
		backgroundColor: '#1a2236',
		margin: '0 auto',
		paddingTop: '30px',
		textAlign: 'center'

	}
}));

const TextHelper = (props) => {
	const classes = styles();
	return(
			<h1 className={classes.root}>{props.text}</h1>
	);
};

export default TextHelper;