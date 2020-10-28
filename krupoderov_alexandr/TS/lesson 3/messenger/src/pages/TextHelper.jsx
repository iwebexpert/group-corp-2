import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles({
	root: {
		color: 'white',
		backgroundColor: '#1a2236',
		margin: '0 auto',
		paddingTop: '30px',
		textAlign: 'center'

	}
});

const TextHelper = ({text}) => {
	const classes = styles();
	return(
		<h1 className={classes.root}>{text}</h1>
	);
};

export default TextHelper;