import { fork } from 'redux-saga/effects'

import watchTodos from '../todos/sagas'
import watchLists from '../lists/sagas'

export default function * sagas () {
  yield [
    fork(watchTodos),
    fork(watchLists)
  ]
}
