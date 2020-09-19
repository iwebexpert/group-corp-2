document.addEventListener("click", (e) => {
  if (e.target.classList.contains("task__checkbox")) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const completed = e.target.dataset.completed;
    axios.patch(`/tasks/${id}/${completed}`).then(() => location.reload());
  }
  if (e.target.classList.contains("remove-btn")) {
    e.preventDefault();
    const id = e.target.dataset.id;
    axios.delete(`/tasks/${id}`).then(() => location.reload());
  }
});
