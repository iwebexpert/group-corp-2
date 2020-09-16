const tasks = document.querySelector(".todo__list");
const todoItem = document.querySelector(".todo__item");

const completeMassage = document.createElement("span");
completeMassage.textContent = "Выполнено!";
completeMassage.style.color = "green";

if (tasks) {
  tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete__btn")) {
      const id = e.target.dataset.id;
      fetch(`/todos/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(location.reload())
        .then((data) => {
          if (data._id) {
            todoItem.remove();
          }
        });
    }
    if (e.target.classList.contains("complete")) {
      const id = e.target.dataset.id;
      fetch(`/todos/${id}`, {
        method: "PATCH",
      }).then((response) => response.json());
    }
  });
}
