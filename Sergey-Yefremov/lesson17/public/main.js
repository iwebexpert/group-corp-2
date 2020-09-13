let bDel = document.querySelectorAll('.btn-delete');
let bSave = document.querySelectorAll('.btn-save');
let form = document.querySelector('.form');
let inputTask = document.querySelector('.title-task');

form.addEventListener('submit', (e) => {
    if (!inputTask.value) {
        alert('Enter your to do');
        e.preventDefault();
    }
})

bDel.forEach(element => {
    element.addEventListener('click', deleteTodo);
});

bSave.forEach(element => {
    element.addEventListener('click', saveTodo);
});

async function deleteTodo() {
    let id = this.getAttribute('data-id');
    let response = await fetch(`/todos/${id}`, { method: 'DELETE', });
    if (response.ok) {
        location.reload();
    }
}

async function saveTodo() {
    let id = this.getAttribute('data-id');
    let response = await fetch(`/todos/${id}`, { method: 'PATCH', });
    if (response.ok) {
        location.reload();
    }
}