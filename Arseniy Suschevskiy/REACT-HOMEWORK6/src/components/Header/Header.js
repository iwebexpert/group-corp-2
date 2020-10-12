import React from 'react'
import classes from './Header.module.css'
import {Chat, Forum, Person, Home} from '@material-ui/icons'
import {Link} from 'react-router-dom'

const Header = props => {
	const [ProfileIcon, setProfileIcon] = React.useState(true)

	const toggleProfileIconHandler = () => {
		setProfileIcon( !ProfileIcon )
	}

	const profilePageLink = (
		<Link to = '/profile' onClick = { toggleProfileIconHandler }>
			<div className={classes.Container}>
				<p className={classes.Person}>{ props.profileInfo.name }</p>
				<Person fontSize = "large" style = {{ color: 'white' }}/>
			</div>
		</Link>
	)

	const HomePageLink = (
		<Link to = '/' onClick = { toggleProfileIconHandler }>
			<Home fontSize = "large" style = {{ color: 'white' }}/>
		</Link>
	)

	return (
		<header className = { classes.Header }>
			<Forum fontSize="large"/>

			{
				ProfileIcon ? profilePageLink : HomePageLink
			}

		</header>
	)
}

export default Header
