import React from 'react'
import Messenger from '../Messenger/Messenger'
import ChatList from '../../components/ChatList/ChatList'
import { Grid } from '@material-ui/core'
import Header from '../../components/Header/Header'
import { chatsData } from '../../helpers/chatsData'
import {Route, Switch} from 'react-router-dom'
import HomePage from '../../pages/HomePage/HomePage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'

const Layout = props => {
	const [chats, setChats] = React.useState(chatsData)

	const addChatHandler = (newChat) => {
		setChats([...chats, newChat])
	}

	return (
		<Grid container >
			<Grid
				container
				direction = 'row'
				justify = 'center'
				alignItems = 'flex-start'
			>
				<Header/>
			</Grid>

			<Grid
				container
				direction = 'row'
				justify = 'center'
				alignItems = 'flex-start'
			>
				<ChatList
					addChat = { addChatHandler }
					chats = { chats }
				/>

				<Switch>
					<Route
						exact
						path = '/profile'
						component = { ProfilePage }
					/>

					<Route
						exact
						path = '/'
						component = { HomePage }
					/>

					<Route
						exact
						path = '/chat/:id'
						render = {
							props =>
								<Messenger
									{ ...props }
									chats = { chats }
								/>
						}
					/>
				</Switch>


			</Grid>
		</Grid>
	)
}

export default Layout
