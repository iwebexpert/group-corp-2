const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')

class Task {
    constructor(title, description) {
        this.title = title
        this.description = description
        this.id = uuid()
    }

    toJSON() {
      return {
        title: this.title,
        description: this.description,
        id: this.id
      }
    }

    static async update(task) {
      const tasks = await Task.getAll()

      const idx = tasks.findIndex(c => c.id === task.id)
      tasks[idx] = task

      return new Promise((resolve, reject) => {
        fs.writeFile(
          path.join(__dirname, '..', 'data', 'db.json'),
          JSON.stringify(tasks),
          (err) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          }
        )
      })
    }

    async save() {
        const tasks = await Task.getAll()
        tasks.push(this.toJSON())

        return new Promise((resolve, reject) => {
          fs.writeFile(
            path.join(__dirname, '..', 'data', 'db.json'),
            JSON.stringify(tasks),
            (err) => {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            }
          )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                'utf-8',
                (err, data) => {
                    if (err) {
                        reject(err)
                    }else {
                      resolve(JSON.parse(data))
                    }
                }
            )
        })
    }

    static async getById(id) {
      const tasks = await Task.getAll()
      return tasks.find(c => c.id === id)
    }
}

module.exports = Task