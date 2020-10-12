import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {
		padding: 10,
		height: '78vh',
		width: 708,
		display: 'flex',
		flexDirection: 'column',
		background: 'rgba(102, 73, 184, .5)',
		marginTop:93,
		textAlign: 'center',
		color: 'white',
	}
}))

const ProfilePage = props => {
	const classes = useStyles()

	return (
		<main className = { classes.root }>
			<h1>Profile page</h1>
			<p>Your username: { props.profileInfo.name }</p>
			<p>Please, select chat in left list</p>
		</main>
	)
}

export default ProfilePage