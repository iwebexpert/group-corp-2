const wrapper = document.querySelector('.tasks');
wrapper.addEventListener('click', async (event) => {
    if(event.target.classList.contains('checkbox')){
        await fetch(`/tasks/${event.target.parentNode.id}`, {
            method: 'PATCH'
        })
    }
});