console.log('It is works');

function onChange(id) {
  fetch(`/todos/${id}`, {
    method: 'PATCH'
  }) 
    .then(() => location.reload())
      .catch((err) => console.log('ERROR: ', err));
}

function onClickDelete(id) {
  fetch(`/todos/${id}`, {
    method: 'DELETE'
  }). then(() => location.reload())
    .catch((err) => {console.log('ERROR: ', err)});
}