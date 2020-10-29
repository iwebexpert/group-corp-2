import React from 'react'
import PropTypes from 'prop-types'
const style = {
	padding: '5px 11px',
	margin: '10px 20px',
	background: 'white',
	borderRadius: '5px',
	boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.27)',
	maxWidth: '500px',
	minWidth: '200px',
	wordWrap: 'break-word'
}

export const messageType = {
	text: PropTypes.string,
	author: PropTypes.string
}


export const Message = (props) => {
	const { text, author } = props

	return (<div
		style={Object.assign({}, style,
			{ alignSelf: author === 'BattleMech' ? 'flex-start' : 'flex-end' })}
	>
		<b>{author}</b>: {text.split('\n').map((item, key) => { //чтобы перенос строки в textarea работал
			return <div key={key}>{item}</div>
		})}	</div>)
}

Message.propTypes = messageType