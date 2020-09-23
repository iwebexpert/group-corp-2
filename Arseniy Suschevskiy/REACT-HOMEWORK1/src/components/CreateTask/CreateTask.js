import React from 'react'
import classes from './CreateTask.module.css'

const CreateTask = props => {
	return (
		<div className={classes.CreateTask}>
			<input
				value = { props.inputValue }
				onChange = { props.inputChangeHandler }
				type = 'text'
			/>
			<button onClick = { props.addTaskHandler }>Add task</button>
		</div>
	)
}

export default CreateTask
