import React from 'react'
import {List, ListItem, ListItemText, ListItemIcon, Divider} from '@material-ui/core'
import {Chat} from '@material-ui/icons'
// import {Link} from 'react-router-dom'
import CreateChat from './CreateChat/CreateChat'
import classes from './ChatList.css'

const ChatList = props => {
	const [selectedIndex, setSelectedIndex] = React.useState( -1)

	const handleListItemClick = chatId => {
		setSelectedIndex(chatId)
		props.chatRedirect(chatId)
	}

	return (
		<div className = { classes.root }>
			<List component = 'nav' aria-label = 'main mailbox folders'>
				{
					props.chats.map( chat => {
						// <Link
						// 	to = { '/chat/' + chat.id }
						// 	key = { chat.id }
						// 	className={ classes.links }
						// >
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

							</ListItem>
						)
						// </Link>
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
