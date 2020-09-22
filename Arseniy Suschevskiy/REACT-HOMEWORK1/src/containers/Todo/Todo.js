import React, { Component } from 'react'
import classes from './Todo.module.css'
import CreateTask from '../../components/CreateTask/CreateTask'
import TasksHolder from '../../components/TasksHolder/TasksHolder'
import ControlButtons from '../../components/ControlButtons/ControlButtons'

class Todo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			setId: 0,
			inputValue: '',
			value: null,
			tasks: [
			]
		}

		this.addTaskHandler = () => {
			const taskList = this.state.tasks

			if (this.state.inputValue !== ''){
				taskList.push({
					id: this.state.setId,
					title: this.state.inputValue,
					completed: false
				})
				this.setState({
					tasks: taskList,
					inputValue:'',
					setId: this.state.setId + 1
				})
			}

		}
		this.inputChangeHandler =  event  => {
			this.setState({
				inputValue: event.target.value
			})
		}
		// Какой то костыль (имхо) :(
		this.checkboxHandler =  elementTask  =>  event  => {
			const checkbox = event.target
			const newTasks = this.state.tasks

			if (checkbox !== undefined) {
				if (checkbox.checked){
					checkbox.parentNode.style.textDecoration = 'line-through'
					newTasks.forEach( task => {
						if (elementTask === task.id) {
							task.completed = true
						}
					})
				} else {
					newTasks.forEach( task => {
						if (elementTask === task.id) {
							task.completed = false
						}
					})
					checkbox.parentNode.style.textDecoration = 'none'
				}
				this.setState({
					tasks: newTasks
				})
			}
		}

		this.clearCheckedBtn = () => {
			const tasks = this.state.tasks

			const newTasks = tasks.filter(task => {
				if (!task.completed) {
					return task
				}
			})
			this.setState({
				tasks: newTasks,
			})
		}

		this.clearAllBtn = () => {
			this.setState({
				tasks: [],
				setId: 0
			})
		}
	}

	render() {
		return (
			<div className={classes.Todo}>
				<h1>Tasks for Today!</h1>
				<CreateTask
					inputValue = { this.state.inputValue }
					inputChangeHandler = { this.inputChangeHandler }
					addTaskHandler = { this.addTaskHandler }
				 />
				<TasksHolder
					checkboxHandler = { this.checkboxHandler }
					tasks = { this.state.tasks }
				/>
				<ControlButtons
					clearAllBtn = { this.clearAllBtn }
					clearCheckedBtn = { this.clearCheckedBtn }
				/>
			</div>
		)
	}
}

export default Todo