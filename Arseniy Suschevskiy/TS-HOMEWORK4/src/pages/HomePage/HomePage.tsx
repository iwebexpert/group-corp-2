import React from 'react'
import {useStyles} from '../rootStyles'

const HomePage: React.FunctionComponent = () => {
	const classes = useStyles()
	return (
		<main className = { classes.root }>
				<h1>Home page</h1>
				<p>Please, select chat in left list</p>
		</main>
	)
}

export default HomePage
