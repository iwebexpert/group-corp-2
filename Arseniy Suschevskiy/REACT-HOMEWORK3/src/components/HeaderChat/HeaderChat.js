import React from 'react'
import classes from './Header.module.css'
import {Chat, Forum} from '@material-ui/icons'

const HeaderChat = props => {
	return (
		<header className = { classes.Header }>
			<Forum fontSize="large"/>
		</header>
	)
}

export default HeaderChat
