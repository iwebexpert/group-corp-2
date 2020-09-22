import React from 'react'
import classes from './ControlButtons.module.css'

const ControlButtons = props => {
	return (
		<div className = { classes.ControlButtons }>
			<button
				className = { classes.clearCheckedBtn }
				onClick = { props.clearCheckedBtn }
			>
				Clear Checked
			</button>

			<button
				className = { classes.clearAllBtn }
				onClick = { props.clearAllBtn }
			>
				Clear All
			</button>
		</div>
	)
}

export default ControlButtons
