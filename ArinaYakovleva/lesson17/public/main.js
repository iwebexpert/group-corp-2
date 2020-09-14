const btnDelete = document.querySelectorAll('.btn-delete'),
    btnDone = document.querySelectorAll('.btn-save'),
    form = document.querySelector('.form'),
    titleTask = document.querySelector('.title-task');

form.addEventListener('submit', (e) => {
    if (!titleTask.value) {
        alert('Enter your to do');
        e.preventDefault();
    }
})

btnDelete.forEach(element => {
    element.addEventListener('click', deletetask);
});

btnDone.forEach(element => {
    element.addEventListener('click', savetask);
});

const deletetask = async () => {
    let id = this.getAttribute('data-index');
    let response = await fetch(`/tasks/${id}`, { method: 'DELETE', });
    if (response.ok) {
        location.reload();
    }
}

const savetask = async () => {
    let id = this.getAttribute('data-index');
    let response = await fetch(`/tasks/${id}`, { method: 'PATCH', });
    if (response.ok) {
        location.reload();
    }
}


