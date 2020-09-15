let deleteBtns = document.querySelectorAll('.btn-outline-danger')
let doneBtns = document.querySelectorAll('.btn-outline-success')


deleteBtns.forEach(element => {
    element.addEventListener('click', deleteTodo)
})

doneBtns.forEach(element => {
    element.addEventListener('click', doneTodo)
})

async function deleteTodo() {
    let id = this.dataset.id
    let response = await fetch(`/todo/${id}`, { method: 'DELETE' })
    if (response.ok) {
        location.reload()
    }
}

async function doneTodo() {
    const id = this.dataset.id
    let response = await fetch(`/todo/${id}`, { method: 'PATCH' })
    if (response.ok) {
        location.reload()
    }
}
