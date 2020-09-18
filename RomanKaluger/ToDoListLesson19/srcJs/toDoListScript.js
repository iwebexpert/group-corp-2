import './../scss/root.scss'
import config from './frontEndConfig'
import moment from 'moment'

class ToDoListApp{
    constructor() {
        this.textArea = document.querySelector('.addString')
        this.addBtn = document.querySelector('.addToDoBtn')
        this.clearAll = document.querySelector('.clearAllBtn')
        this.taskList = document.querySelector('.toDoList')
        this.initHandles()
        this.updateTaskList()
    }
    async getTasks() {
        const response = await fetch(`${config.host}/todo/list/${document.forms.categoryCheckForm.elements.categoryCheck.value}/${document.forms.upOrDownForm.elements.upOrDown.value}`, {
            method: 'GET'
        })
        if (response.ok){
            return await response.json()
        }
        return null
    }
    async updateTaskList() {
        this.taskList.innerHTML = ''
        const tasks = await this.getTasks()
        if (tasks.toDOItems.length) {
            this.clearAll.classList.remove('clearAllBtnHidden')
            tasks.toDOItems.forEach(tsk => {
                this.taskList.insertAdjacentHTML('beforeend',
                    `
                           <div class="toDoCard">
                               <div data-name="toDoCardStatus" data-card-id="${tsk.id}" class="toDoCardStatus${tsk.completed?' toDoCardStatusCompleted':''}"></div>
                               <div class="toDoCardText">${tsk.text}</div>
                               <div class="toDoCardPrior"><img src="${config.priorityImgsUrl[tsk.priority]}"></div>
                               <div class="toDoCardDate">${tsk.date}</div>
                               <div data-name="toDoCardDelete" data-card-id="${tsk.id}" class="toDoCardDelete"></div>
                           </div>
                        `)
            })
            return
        }
        this.clearAll.classList.add('clearAllBtnHidden')
        this.taskList.insertAdjacentHTML('beforeend',`<div class="notice">Нет данных</div>`)
    }
    initHandles() {
        this.addBtn.addEventListener('click',async () => {
            if (!this.textArea.value){
                this.textArea.classList.add('addStringValidationAlert')
                this.textArea.setAttribute('placeholder', 'Не должно быть пустым')
                return
            }
            this.textArea.setAttribute('placeholder', 'Сделать...')
            this.textArea.classList.remove('addStringValidationAlert')
            const response = await fetch(`${config.host}/todo/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: this.textArea.value,
                    date: moment().format("D.M.YYYY, HH:mm:ss"),
                    priority: document.forms.priorityContainer.elements.priorityCheck.value,
                })
            })
            this.textArea.value = ''
            if (!response.ok) {
                throw new Error('Post task error')
            }
            this.updateTaskList()
        })
        this.clearAll.addEventListener('click',async () => {
            const response = await fetch(`${config.host}/todo/list/all`,{
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('DeleteAll task error')
            }
            this.updateTaskList()
        })
        document.body.addEventListener('click', async (e) => {
            switch (e.target.dataset.name) {
                case 'toDoCardStatus':{
                    e.target.classList.toggle('toDoCardStatusCompleted')
                    const response = await fetch(`${config.host}/todo/list`,{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            completed: e.target.classList.contains('toDoCardStatusCompleted'),
                            id: e.target.dataset.cardId
                        })
                    })
                    if (!response.ok) {
                        throw new Error('Patch task error')
                    }
                    this.updateTaskList()
                    break
                }
                case 'toDoCardDelete':{
                    const response = await fetch(`${config.host}/todo/list/${e.target.dataset.cardId}`,{
                        method: 'DELETE'
                    })
                    if (!response.ok) {
                        throw new Error('Delete task error')
                    }
                    this.updateTaskList()
                  break
                }
            }
        })
        document.body.addEventListener('input', async (e) => {
            switch (e.target.name) {
                case 'upOrDown':
                case 'categoryCheck': {
                    this.updateTaskList()
                    break
                }
            }
        })
    }
}

new ToDoListApp()
