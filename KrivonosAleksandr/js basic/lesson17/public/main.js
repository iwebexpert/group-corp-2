onChange = async (id) => {
    await fetch('/tasks/' + id, {
        method: 'PATCH'
    })
}