import { call, put, fork, take } from 'redux-saga/effects'

import { normalize } from 'normalizr'

import api from 'config/api'

import * as actions from 'App/stores/resources/actions'
import t from 'App/stores/resources/actions/constants'

import * as schema from '../schema'

export function * receiveResponse (response) {
  if (response.ok) {
    const list = normalize(response.data.list, schema.list)

    yield put(actions.setEntity(list, {type: 'lists'}))
  } else {
    const error = response.data.error

    yield put(actions.requestFailure(error, {type: 'lists'}))
  }
}

export function * addList () {
  while (true) {
    const action = yield take(t.SUBMIT_ENTITY)
    if (action.meta && action.meta.type === 'lists') {
      const list = { ...action.payload }

      const response = yield call(api.post, '/lists', {...list})

      yield fork(receiveResponse, response)
    }
  }
}

export default function * watchLists () {
  yield fork(addList)
}
