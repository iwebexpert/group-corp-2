import React from 'react'
import {List, ListItem, ListItemText, ListItemIcon, Divider} from '@material-ui/core'
import {Chat} from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import Create from '@material-ui/icons/Create'
import IconButton from '@material-ui/core/IconButton'
import CreateChat from './CreateChat/CreateChat'
import classes from './ChatList.module.css'
import ListSubheader from '@material-ui/core/ListSubheader'
import Loader from '../UI/Loader/Loader'
import {useLocation} from 'react-router-dom'

type ChatListType = {
	addChat: (chat: chatType) => void
	chats: chatType[]
	chatRedirect: (chatId: number) => void
	deleteChat: (chatId: number) => void
	loading: boolean
	chatLoading: boolean
	redirect: () => void
}

const ChatList: React.FunctionComponent<ChatListType> = props => {
	const [selectedIndex, setSelectedIndex] = React.useState( -1)
	const [showDeleteIcon, setShowDeleteIcon] = React.useState( false)
	const location = useLocation()

	const handleListItemClick = (chatId: number | undefined) => {
		if (chatId) {
			setSelectedIndex(chatId)
			props.chatRedirect(chatId)
		}
	}

	const deleteIconClick = (event: React.MouseEvent, chatId: number | undefined) => {
		if (!chatId) {
			return
		}
		event.stopPropagation()
		const locationChatId = location.pathname.slice(6)
		if (chatId === +locationChatId){
			props.deleteChat(chatId)
			props.redirect()
		}
		props.deleteChat(chatId)
		setShowDeleteIcon(false)
	}

	const subheader = (
		<ListSubheader className = { classes.title }>
			Chat List
			<IconButton
				edge = "end"
				aria-label = "delete"
				className = { classes.button }
				onClick = { () => setShowDeleteIcon(!showDeleteIcon) }
			>
				<Create style = {{ color: 'white' }} />
			</IconButton>
		</ListSubheader>
	)

	return (
		<div className = { classes.root }>
			<List
				component = 'nav'
				aria-label = 'main mailbox folders'
				subheader = { subheader }
			>

				<Divider/>
				{
					props.loading
					? <Loader/>
					: props.chats.map( chat => {
						const listItemClasses = [classes.links]
						if (chat.fire){
							listItemClasses.push(classes.blink)
						}
						return (
							<ListItem
								button
								key = { chat.id }
								selected = { selectedIndex === chat.id }
								onClick = { () => handleListItemClick(chat.id) }
							>

								<ListItemIcon>
									<Chat style={{ color: 'white' }}/>
								</ListItemIcon>

								<ListItemText
									primary = { chat.title }
									className = { listItemClasses.join(' ') }
								/>
								{
									showDeleteIcon
									&&
									(<IconButton
										edge="end"
										aria-label="delete"
										onClick = { event => deleteIconClick(event, chat.id) }
									>
										<DeleteIcon style={{ color: 'white' }} />
									</IconButton>)
								}
							</ListItem>
						)
					})
				}

				<Divider />
				<CreateChat
					addChat = { props.addChat }
					handleListItemClick = { handleListItemClick }
					chatLoading = { props.chatLoading }
				/>
			</List>
		</div>
	)
}

export default ChatList
