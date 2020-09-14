let btnsDelete = document.querySelectorAll('.btn-delete');
let btnsSave = document.querySelectorAll('.btn-save');
let form = document.querySelector('.form');
let inputTask = document.querySelector('.title-task');

form.addEventListener('submit', (e) => {
    if (!inputTask.value) {
        Swal.fire('Введите название задачи');
        e.preventDefault();
    }
})

btnsDelete.forEach(element => {
    element.addEventListener('click', deleteTask);
});

btnsSave.forEach(element => {
    element.addEventListener('click', saveTask);
});

async function deleteTask() {
    let id = this.getAttribute('data-id');
    let response = await fetch(`/todos/${id}`, { method: 'DELETE', });
    if (response.ok) {
        location.reload();
    }
}

async function saveTask() {
    let id = this.getAttribute('data-id');
    let response = await fetch(`/todos/${id}`, { method: 'PATCH', });
    if (response.ok) {
        location.reload();
    }
}