import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		width: '40%',
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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
	profileImg: {
		width: '200px',
		height: '200px',
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
});

function Profile() {
	const classes = useStyles();
	const profile = useSelector((state) => state.profile.entries);
	return (
		<Card className={classes.root}>
			<CardContent className={classes.cardContent}>
				<div>
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
				</div>
				<CardMedia
					className={classes.profileImg}
					component="img"
					alt="Contemplative Reptile"
					height="140"
					image={profile.avatar}
					title="Contemplative Reptile"
				/>
				{/* <img src={profile.avatar} alt=""/> */}
			</CardContent>
		</Card>
	);
}

export default Profile;
