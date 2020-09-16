const messages = document.querySelector('.wrapper');

if (messages) {
    messages.addEventListener('click', (event) => {
        if (event.target.classList.contains('messege__delete')) {
            event.preventDefault();
            const id = event.target.dataset.id;
            const messageItem = event.target.parentElement;

            fetch(`/users/${id}`, {
                method: 'DELETE'

            })
                .then(response => response.json())
                .then(data => {
                    if (data._id) {
                        messageItem.remove();
                    }
                    if (data.error) {
                        alert('Не удалось удалить задачу');
                    }
                })
                .catch(err => {
                    alert('Не удалось удалить задачу');
                })
        }
    });
}