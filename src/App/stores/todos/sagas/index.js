import { put, fork, call, take } from 'redux-saga/effects'

import { normalize } from 'normalizr'

import api from 'config/api'

import * as actions from 'App/stores/resources/actions'
import t from 'App/stores/resources/actions/constants'

import * as schema from '../schema'

/*
 * Subroutines
 */

export function* receiveResponse (response) {
  if (response.ok) {
    const todo = normalize(response.data.todo, schema.todo)

    yield put(actions.setEntity(todo, {type: 'todos'}))
  } else {
    const error = response.data.error

    yield put(actions.requestFailure(error, {type: 'todos'}))
  }
}

export function* addTodo () {
  while (true) {
    const action = yield take(t.SUBMIT_ENTITY)
    if (action.meta && action.meta.type === 'todos') {
      const todo = {
        ...action.payload,
        listID: 1 // Change this to support multiple lists
      }

      const response = yield call(api.post, '/todos', {...todo})

      yield fork(receiveResponse, response)
    }
  }
}

export function* toggleTodo () {
  while (true) {
    const action = yield take(t.UPDATE_ENTITY)
    if (action.meta && action.meta.type === 'todos') {
      const todo = action.payload
      const response = yield call(api.put, `/todos/${todo.id}`, {...todo})

      yield fork(receiveResponse, response)
    }
  }
}

/*
 * Watchers
 */

export default function* watchTodos () {
  yield [
    fork(addTodo),
    fork(toggleTodo)
  ]
}
