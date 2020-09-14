const removeTask = (id) => {
  axios.delete(`/tasks/${id}`).then((res) => location.reload());
};
const onCheckboxChange = (id) => {
  axios.patch(`/tasks/${id}`).then(() => location.reload());
};
