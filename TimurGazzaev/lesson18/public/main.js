const tasks = document.querySelector('.tasks')

if(tasks){
    tasks.addEventListener('click', (event) => {
        if(event.target.classList.contains('close')){
            event.preventDefault()
            const id = event.target.dataset.id

            fetch(`/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(res => location.reload())
                .catch(err => {
                    alert('Не удалось удалить задачу')
                })
        }
        if(event.target.classList.contains('taskItem')){
            event.preventDefault()
            const id = event.target.dataset.id
            const completed = event.target.dataset.completed

            fetch(`/tasks/${id}/${completed}`, {
                method: 'PATCH',
            })
                .then(response => response.json())
                .then(res => location.reload())
        }
    })
}
