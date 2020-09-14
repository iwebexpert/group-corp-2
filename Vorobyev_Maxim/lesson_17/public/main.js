document.getElementsByClassName("submit_button")[0].addEventListener("click", (event) => {
  if (!document.getElementsByClassName("task_title")[0].value.length) {
    alert("Empty title");
    event.preventDefault();
  }
});
