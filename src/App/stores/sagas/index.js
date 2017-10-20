import { fork } from 'redux-saga/effects'

import watchTodos from '../todos/sagas'

export default function* sagas () {
  yield [
    fork(watchTodos)
  ]
}
