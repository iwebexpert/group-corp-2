import React from 'react'
import Loader from 'components/UI/Loader/Loader'
import {useStyles} from '../rootStyles'

const ProfilePage = props => {
	const classes = useStyles()
	return (
		<main className = { classes.root }>
			<h1>Profile page</h1>

			{
				props.loading
				? <Loader/>
				: <p>Your username: { props.profileInfo.name }</p>
			}

			<p>Please, select chat in left list</p>
		</main>
	)
}

export default ProfilePage