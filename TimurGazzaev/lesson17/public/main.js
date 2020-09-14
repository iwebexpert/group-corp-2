function onChange(id) {
    fetch('/tasks/' + id, {
        method: 'PATCH',
    }).then(res => location.reload())
}

function deleteTask(id) {
    fetch('/tasks/' + id, {
        method: 'DELETE',
    }).then(res => location.reload())
}
