import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = makeStyles(theme => ({
	root: {
		color: 'white',
		backgroundColor: '#1a2236',
		width: '100%',
		height: '90vh'
	},
	header: {
		margin: '0 auto',
		paddingTop: '30px',
		textAlign: 'center'
	}
}));

const TextHelper = (props) => {
	const classes = styles();
	return(
		<Paper square className={classes.root}>
			<h1 className={classes.header}>{props.text}</h1>
		</Paper>
	);
};

export default TextHelper;