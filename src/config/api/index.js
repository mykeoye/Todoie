import { v4 } from 'node-uuid'

const fakeDB = {
  lists: [],
  todos: []
}

const apiResponse = ({
  ok = true,
  problem = 'NONE',
  data = {}
} = {}) => ({
  ok, problem, data
})

const api = {
  get: (path) => {
    const id = path.split('/')[2]

    let data
    if (typeof id === 'undefined') {
      if (path.match(/lists/g)) {
        data = {lists: fakeDB.lists}
      } else {
        data = {todos: fakeDB.todos}
      }
    } else {
      if (path.match(/lists/g)) {
        let list = fakeDB.lists.find(i => i.id === id)

        if (typeof list === 'undefined') {
          return apiResponse({
            ok: false,
            problem: 'CLIENT_ERROR',
            data: {
              error: 'List not found'
            }
          })
        }

        data = {
          list: {
            ...list,
            todos: fakeDB.todos.filter(todo => todo.listID === list.id)
          }
        }
      } else {
        let todo = fakeDB.todos.find(i => i.id === id)

        if (typeof todo === 'undefined') {
          return apiResponse({
            ok: false,
            problem: 'CLIENT_ERROR',
            data: {
              error: 'Item not found'
            }
          })
        }

        data = { todo }
      }
    }

    return apiResponse({ data })
  },

  post: (path, data) => {
    if (path.match(/lists/g)) {
      if (typeof data.name === 'undefined') {
        return apiResponse({
          ok: false,
          problem: 'CLIENT_ERROR',
          data: {
            error: 'Missing required attribute for new List. Make sure the list has name attribute.'
          }
        })
      }

      const list = createList(data)

      fakeDB.lists.push(list)

      return apiResponse({data: { list }})
    } else {
      if (typeof data.text === 'undefined' || typeof data.listID === 'undefined') {
        return apiResponse({
          ok: false,
          problem: 'CLIENT_ERROR',
          data: {
            error: 'Missing required attribute for new Item. Make sure the item has text and listID attributes.'
          }
        })
      }

      const todo = createTodo(data)

      fakeDB.todos.push(todo)

      return apiResponse({data: { todo }})
    }
  },

  put: (path, data) => {
    const id = path.split('/')[2]

    let todo = fakeDB.todos.find(i => i.id === id)

    if (typeof todo === 'undefined') {
      todo = createTodo({...data, id})
    } else {
      Object.keys(data).map(key => {
        todo[key] = data[key]
      })
    }

    return apiResponse({data: { todo }})
  }
}

export default api

/*
 * Factories
 */

function createList (data) {
  return Object.assign({}, {
    id: v4(),
    createdAt: new Date()
  }, data)
}

function createTodo (data) {
  return Object.assign({}, {
    id: v4(),
    createdAt: new Date(),
    completed: false
  }, data)
}
