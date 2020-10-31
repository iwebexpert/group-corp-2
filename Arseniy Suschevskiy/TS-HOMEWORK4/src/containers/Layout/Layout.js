import React, {useEffect} from 'react'
import Messenger from '../Messenger/Messenger'
import ChatList from '../../components/ChatList/ChatList'
import { Grid } from '@material-ui/core'
import Header from '../../components/Header/Header'
import {Route, Switch} from 'react-router-dom'
import HomePage from '../../pages/HomePage/HomePage.tsx'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import {connect} from 'react-redux'
import {addNewChat, addNewMessage, chatsLoad, deleteChat} from '../../store/actions/chats'
import {profileLoad} from '../../store/actions/profile'
import {push} from 'connected-react-router'

const Layout = props => {

	useEffect(() => {
		props.chatsLoad()
		props.profileLoad()
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
					profileInfo = { props.profileInfo }
					loading = { props.profileLoading }
				/>

			</Grid>

			<Grid
				container
				direction = 'row'
				justify = 'center'
				alignItems = 'flex-start'
			>
				<ChatList
					addChat = { props.addNewChat }
					chats = { props.chatsList }
					chatRedirect = { props.chatRedirect }
					deleteChat = { props.deleteChat }
					loading = { props.loading }
					chatLoading = { props.chatLoading }
					redirect = { props.redirect }
				/>

				<Switch>
					<Route
						exact
						path = '/profile'
						render = {
							() =>
								<ProfilePage
									profileInfo = { props.profileInfo }
									loading = { props.profileLoading }
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
									{ ...renderProps }
									chats = { props.chatsList }
									lastAuthor = { props.lastAuthor }
									handleMessageSend = { props.addNewMessage }
								/>
						}
					/>
				</Switch>
			</Grid>
		</Grid>
	)
}

function mapStateToProps(state) {
	return {
		chatsList: state.chats.chatsList,
		lastAuthor: state.chats.lastAuthor,
		profileInfo: state.profile.profileInfo,
		profileLoading: state.profile.loading,
		loading: state.chats.loading,
		chatLoading: state.chats.chatLoading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		chatsLoad: () => dispatch(chatsLoad()),
		profileLoad: () => dispatch(profileLoad()),
		addNewChat: chat => dispatch(addNewChat(chat)),
		addNewMessage: (message, chat) => dispatch(addNewMessage(message, chat)),
		chatRedirect: chatId => dispatch(push(`/chat/${chatId}`)),
		redirect: () => dispatch(push('/')),
		deleteChat: chatId => dispatch(deleteChat(chatId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
