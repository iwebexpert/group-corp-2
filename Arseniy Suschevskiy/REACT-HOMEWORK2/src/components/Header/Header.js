import React from 'react'
import classes from './Header.module.css'

const Header = props => {
	return (
		<header className = { classes.Header }>
			<h1>Chat with robot</h1>
		</header>
	)
}

export default Header
