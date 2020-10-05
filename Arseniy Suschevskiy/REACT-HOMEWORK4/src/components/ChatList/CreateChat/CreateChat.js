import React from 'react'
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
	root:{
		color: 'white',
	},
	links: {
		color: 'white',
		textDecoration:'none'
	},
	input:{
		color: 'white',
		border: 'none',
		borderBottom: '1px solid #1e1e24',
		outline: 'none',
		background: '#6649b8',
		fontSize: '1.2rem',
		height: 45,
		paddingLeft: 15,
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontWeight: 400,
		lineHeight: 1.5,
	}
}))

const CreateChat = props => {
	const classes = useStyles()
	const [listItem, switchListItem] = React.useState( true)
	const [inputValue, setInputValue] = React.useState('')
	const [id, setId] = React.useState(3)

	const createNewChatHandler = (event) => {

		if (event.key === 'Enter'){
			const newChat = {
				id ,
				title: event.target.value,
				messages: []
			}
			setId(id + 1)
			props.addChat(newChat)
			toggleListItemHandler()
		}
	}

	const inputChangeHandler = event => {
		setInputValue(event.target.value)
	}

	const listItemInput = (
			<input
				autoFocus
				className = { classes.input }
				onKeyPress = { createNewChatHandler }
				value = { inputValue }
				onChange = { inputChangeHandler }
			/>
	)

	const listItemText = (
		<ListItemText primary = 'Add new chat' />
	)

	const toggleListItemHandler = () => {
		setInputValue('')
		switchListItem( !listItem )
	}

	return (
		<>
			<ListItem
				button
				className = { classes.root }
				onClick = { toggleListItemHandler }
			>
				<ListItemIcon>
					<Add style = {{ color: 'white' }} fontSize = 'large' />
				</ListItemIcon>

				{ listItem ? listItemText : listItemInput }

			</ListItem>

		</>
	)
}

export default CreateChat
