import React from 'react'
import {ListItemText, ListItemIcon, ListItem, List, makeStyles} from '@material-ui/core'
import {Chat} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	root: {
		position:'absolute',
		left: '80px',
		top:'30%',
		width: '100%',
		maxWidth: 360,
		backgroundColor: 'rgba(102, 73, 184, .5)',
		color: 'white',
	},
}))

const ChatList = props => {
	const classes = useStyles()
	const [selectedIndex, setSelectedIndex] = React.useState(1)

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index)
	}

	return (
		<div className={ classes.root }>
			<List component='nav' aria-label='main mailbox folders'>
				<ListItem
					button
					selected={ selectedIndex === 0 }
					onClick={(event) => handleListItemClick(event, 0)}
				>
					<ListItemIcon>
						<Chat style={{ color:'white' }}/>
					</ListItemIcon>
					<ListItemText primary='Chat 1' />
				</ListItem>
				<ListItem
					button
					selected={ selectedIndex === 1 }
					onClick={(event) => handleListItemClick(event, 1)}
				>
					<ListItemIcon>
						<Chat style={{ color:'white' }}/>
					</ListItemIcon>
					<ListItemText primary='Chat 2' />
				</ListItem>
				<ListItem
					button
					selected={ selectedIndex === 2 }
					onClick={(event) => handleListItemClick(event, 2)}
				>
					<ListItemIcon>
						<Chat style={{ color:'white' }}/>
					</ListItemIcon>
					<ListItemText primary='Chat 3' />
				</ListItem>
			</List>
		</div>
	)
}

export default ChatList
