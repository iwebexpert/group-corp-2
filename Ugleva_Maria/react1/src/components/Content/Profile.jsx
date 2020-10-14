import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

function Profile({profile}) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Profile
				</Typography>
				<Typography variant="h5" component="h2">
					{profile.name} {profile.surname}, {profile.age}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{profile.country}, {profile.city}
				</Typography>
				<Typography variant="body2" component="p">
					{profile.email}
				</Typography>
			</CardContent>
		</Card>
	);
}
const mapStateToProps = (state) => {
	return {
		profile: state.profile.entries,
	};
};
export default connect(mapStateToProps)(Profile);
