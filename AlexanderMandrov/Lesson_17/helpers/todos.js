let maxId = 0

const createTodoItem = (label) => {
  return {
    label,
    done: false,
    id: maxId++
  }
}

module.exports = [
  createTodoItem('Drink Coffee'),
  createTodoItem('Build Awesome App'),
  createTodoItem('Have a lunch')
]