import autosize from "autosize/src/autosize"
import './../scss/root.scss'
import config from './../config/serverConfig'
import moment from 'moment'

class ToDoListApp{
    constructor() {
        this.textArea = document.querySelector('.addString')
        this.addBtn = document.querySelector('.addToDoBtn')
        this.clearAll = document.querySelector('.clearAllBtn')
        //autosize(this.textArea)
        document.querySelector(`#${location.pathname.match(/\w+(?=\/\w+(\/)?$)/)[0]}`).setAttribute('checked', 'true')
        document.querySelector(`#${location.pathname.match(/(?<=\w+\/)\w+(?=(\/)?$)/)[0]}`).setAttribute('checked', 'true')
        this.initHandles()
    }
    async checkResponse(res){
        if (res.ok) {
            document.location.reload()
        } else{
            const json = await res.json()
            console.log(json.message)
        }
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
            const res = await fetch(`${config.host}/todo/list`, {
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
            this.checkResponse(res)
        })
        if (this.clearAll) {
            this.clearAll.addEventListener('click',async () => {
                const res = await fetch(`${config.host}/todo/list/ALL`,{
                    method: 'DELETE'
                })
                this.checkResponse(res)
            })
        }
        document.body.addEventListener('click', async (e) => {
            switch (e.target.dataset.name) {
                case 'toDoCardStatus':{
                    //e.target.classList.toggle('toDoCardStatusCompleted')
                    const res = await fetch(`${config.host}/todo/list`,{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            completed: !e.target.classList.contains('toDoCardStatusCompleted'),
                            id: e.target.dataset.cardId
                        })
                    })
                    this.checkResponse(res)
                    break
                }
                case 'toDoCardDelete':{
                    const res = await fetch(`${config.host}/todo/list/${e.target.dataset.cardId}`,{
                        method: 'DELETE'
                    })
                    this.checkResponse(res)
                    break
                }
            }
        })
        document.body.addEventListener('input', async (e) => {
            switch (e.target.name) {
                case 'upOrDown':
                case 'categoryCheck': {
                    location.href = `${config.host}/todo/list/${document.forms.categoryCheckForm.elements.categoryCheck.value}/${document.forms.upOrDownForm.elements.upOrDown.value}`
                    break
                }
            }
        })
    }
}

new ToDoListApp()
