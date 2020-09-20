const tasks = document.querySelector('.task');

    if(tasks){
        tasks.addEventListener('click', (event)=>{
            const target = event.target;

            if(target.classList.contains('btn-delete')){
                event.preventDefault();
                let id = target.dataset.index;

                fetch(`/tasks/${id}`,{
                    method: 'DELETE'
                })
                .then((res) => {
                    if(res.ok){
                        location.reload();
                    }    
                })
                .catch(data => alert('Не удалось удалить задачу'))
            }
            if(target.classList.contains('btn-save')){
                let id = target.dataset.index;

                fetch(`/tasks/${id}`,{
                    method: 'PATCH'
                })
                .then((res) => {
                    if(res.ok){
                        location.reload();
                    }    
                })
                .catch(data => alert('Не удалось отметить задачу'))
            }
        })
    }

