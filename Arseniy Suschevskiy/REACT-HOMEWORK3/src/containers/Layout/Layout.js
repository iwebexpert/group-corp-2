import React from 'react'
import classes from './Layout.module.css'
import Messenger from '../Messenger/Messenger'
import ChatList from '../../components/ChatList/ChatList'

const Layout = props => {
	return (
		<>
			<ChatList/>
			<Messenger/>
		</>
	)
}

export default Layout
