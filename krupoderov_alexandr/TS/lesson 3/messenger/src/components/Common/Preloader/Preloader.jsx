import React from 'react';
import preloader from '../../../assets/img/preloader.svg';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center'
	}
});

const Preloader = () => {
	const classes = styles();
	return (
		<div className={classes.root}>
			<img src={preloader} alt=""/>
		</div>
	);
};

export default Preloader;