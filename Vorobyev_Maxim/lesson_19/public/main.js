for (let i = 0; i < document.getElementsByClassName('button__delete').length; i++) {
  document.getElementsByClassName('button__delete')[i].addEventListener('click', deleteTask);
}

for (let i = 0; i < document.getElementsByClassName('button__comp').length; i++) {
  document.getElementsByClassName('button__comp')[i].addEventListener('click', saveTask);
}

document.getElementsByClassName('sbm__button')[0].addEventListener("click", function (event) {
  if (!document.getElementsByClassName('inp')[0].value) {
    alert("Task name is empty!");
    event.preventDefault();
  } 
});

async function deleteTask() {
  let id = this.getAttribute('data-id');
  let response = await fetch(`/tasks/${id}`, {method: 'DELETE', });
  if (response.ok) {
    location.reload();
  }
}

async function saveTask() {
  let id = this.getAttribute('data-id');
  let response = await fetch(`/tasks/${id}`, {method: 'PATCH', });
  if (response.ok) {
    location.reload();
  }
}