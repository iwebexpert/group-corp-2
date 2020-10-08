import React from 'react'
import {List, ListItem, ListItemText, ListItemIcon, makeStyles, Divider} from '@material-ui/core'
import {Chat} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import CreateChat from './CreateChat/CreateChat'

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: 'rgba(102, 73, 184, .5)',
		marginTop: 93,
		borderRight: '1px solid #1e1e24',
	},
	links: {
		color: 'white',
		textDecoration:'none'
	}
}))

const ChatList = props => {
	const classes = useStyles()
	const [selectedIndex, setSelectedIndex] = React.useState( -1)

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index)
	}

	return (
		<div className = { classes.root }>
			<List component = 'nav' aria-label = 'main mailbox folders'>
				{
					props.chats.map( chat => (
						<Link
							to = { '/chat/' + chat.id }
							key = { chat.id }
							className={ classes.links }
						>
							<ListItem
								button
								selected = { selectedIndex === chat.id }
								onClick = { event => handleListItemClick(event, chat.id) }
							>

								<ListItemIcon>
									<Chat style={{ color:'white' }}/>
								</ListItemIcon>

								<ListItemText primary = { chat.title } />

							</ListItem>
						</Link>
					))
				}

				<Divider />
				<CreateChat addChat = { props.addChat } />
			</List>
		</div>
	)
}

export default ChatList
