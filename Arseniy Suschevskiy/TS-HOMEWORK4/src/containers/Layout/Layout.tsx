import React, {useEffect} from 'react'
import Messenger from '../Messenger/Messenger'
import ChatList from '../../components/ChatList/ChatList'
import { Grid } from '@material-ui/core'
import Header from '../../components/Header/Header'
import {Route, Switch} from 'react-router-dom'
import HomePage from '../../pages/HomePage/HomePage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import { useDispatch, useSelector } from 'react-redux'
import {addNewChat, addNewMessage, chatsLoad, deleteChat} from '../../store/actions/chats'
import {profileLoad} from '../../store/actions/profile'
import {push} from 'connected-react-router'

const Layout: React.FunctionComponent = () => {
	const dispatch = useDispatch()
	const chatsData = useSelector((state: RootState) => state.chats)
	const profileData = useSelector((state: RootState) => state.profile)

	useEffect(() => {
		dispatch(chatsLoad())
		dispatch(profileLoad())
	}, [])

	return (
		<Grid container >
			<Grid
				container
				direction = 'row'
				justify = 'center'
				alignItems = 'flex-start'
			>

				<Header
					profileInfo = { profileData.profileInfo }
					loading = { profileData.loading }
				/>

			</Grid>

			<Grid
				container
				direction = 'row'
				justify = 'center'
				alignItems = 'flex-start'
			>
				<ChatList
					addChat = { (chat: chatType) => dispatch(addNewChat(chat)) }
					chats = { chatsData.chatsList }
					chatRedirect = { (chatId: number) => dispatch(push(`/chat/${chatId}`)) }
					deleteChat = { (chatId: number) => dispatch(deleteChat(chatId)) }
					loading = { chatsData.loading }
					chatLoading = { chatsData.chatLoading }
					redirect = { () => dispatch(push('/')) }
				/>

				<Switch>
					<Route
						exact
						path = '/profile'
						render = {
							() =>
								<ProfilePage
									profileInfo = { profileData.profileInfo }
									loading = { profileData.loading }
								/>
						}
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
							renderProps =>
								<Messenger
									chats = { chatsData.chatsList }
									handleMessageSend = { (message: messageTypeRequest, chat: number) => dispatch(addNewMessage(message, chat)) }
								/>
						}
					/>
				</Switch>
			</Grid>
		</Grid>
	)
}

export default Layout
