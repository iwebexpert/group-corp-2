import React from 'react'
import classes from './TasksHolder.module.css'

const TasksHolder = props => {
	return (
		<ul className={classes.TasksHolder}>
			{ props.tasks.map((task, index) => {
				return (
					<li
						key={index}
					>
						<input id='task-checkbox' onClick={ props.checkboxHandler(task.id) } type='checkbox'/>
						{task.title}
					</li>
				)
			}) }
		</ul>
	)
}

export default TasksHolder
