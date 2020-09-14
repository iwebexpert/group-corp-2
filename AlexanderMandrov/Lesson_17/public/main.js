let deleteBtns = document.querySelectorAll('.btn-outline-danger')
let doneBtns = document.querySelectorAll('.btn-outline-success')


deleteBtns.forEach(element => {
    element.addEventListener('click', deletetask)
})

doneBtns.forEach(element => {
    element.addEventListener('click', savetask)
})

async function deletetask() {
    let id = this.dataset.id
    let response = await fetch(`/todo/${id}`, { method: 'DELETE' })
    if (response.ok) {
        location.reload()
    }
}

async function savetask() {
    const id = this.dataset.id
    let response = await fetch(`/todo/${id}`, { method: 'PATCH' })
    if (response.ok) {
        location.reload()
    }
}
