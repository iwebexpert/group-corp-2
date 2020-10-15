import React from 'react'
import {List, ListItem, ListItemText, ListItemIcon, Divider} from '@material-ui/core'
import {Chat} from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import Create from '@material-ui/icons/Create'
import IconButton from '@material-ui/core/IconButton'
import CreateChat from './CreateChat/CreateChat'
import classes from './ChatList.css'
import ListSubheader from '@material-ui/core/ListSubheader'
import Loader from 'components/UI/Loader/Loader'

const ChatList = props => {
	const [selectedIndex, setSelectedIndex] = React.useState( -1)
	const [showDeleteIcon, setShowDeleteIcon] = React.useState( false)

	const handleListItemClick = chatId => {
		setSelectedIndex(chatId)
		props.chatRedirect(chatId)
	}

	const deleteIconClick = chatId => {
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
				<Create style={{ color: 'white' }} />
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
									className={ listItemClasses.join(' ') }
								/>
								{
									showDeleteIcon
									&&
									(<IconButton
										edge="end"
										aria-label="delete"
										onClick = { () => deleteIconClick(chat.id) }
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
					setChatId = { props.setChatId }
					handleListItemClick = { handleListItemClick }
				/>
			</List>
		</div>
	)
}

export default ChatList
