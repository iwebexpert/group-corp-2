const wrapper = document.querySelector('.wrapper');
wrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains('checkbox')){
      event.preventDefault();
      if(event.target.checked){
        saveCheckbox(event.target.id, true);
      } else{
        saveCheckbox(event.target.id, false);
      };
    } else if(event.target.classList.contains('btn-danger')) {
        deleteTask(event.target.id);
    };
  });

function saveCheckbox(id, status){
  const newProduct = fetch(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      check:status,
    }),
    headers:{
      'Content-type': 'application/json',
    }
  }).then( (res) => location.reload());
}

function deleteTask(id){
  const newProduct =  fetch(`/tasks/${id}`, {
    method: 'DELETE',
  }).then( (res) => location.reload());
}
