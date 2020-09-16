const btnsDelete = document.querySelectorAll('.btn-delete')
const btnsPerformed = document.querySelectorAll('.btn-performed')
const form = document.querySelector('.form')
const inputTask = document.querySelector('.form__title')
const errorInput = document.querySelector('.error-input')
const addTask = document.querySelector('.add-task')


form.addEventListener('submit', (e) => {
    if (!inputTask.value) {
        errorInput.textContent = 'Enter task name!'
        errorInput.style.display = 'block'
        errorInput.style.color = 'red'
        addTask.append(errorInput);
        inputTask.style.borderColor = 'red'
        e.preventDefault();
    } else {
        errorInput.style.color = ''
        errorInput.style.display = 'none'
        inputTask.style.borderColor = ''
    }
})

async function deleteTask() {
    const id = this.getAttribute('data-id')
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        location.reload()
    }
}

async function performedTask() {
    const id = this.getAttribute('data-id')
    const response = await fetch(`/tasks/${id}`, {
        method: 'PATCH',
    });
    if (response.ok) {
        location.reload()
    }
}

btnsDelete.forEach(element => {
    element.addEventListener('click', deleteTask)
});

btnsPerformed.forEach(element => {
    element.addEventListener('click', performedTask)
});