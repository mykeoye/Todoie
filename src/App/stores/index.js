import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import todos from './todos'
import lists from './lists'

export default combineReducers({
  todos,
  lists,
  form: formReducer
})
