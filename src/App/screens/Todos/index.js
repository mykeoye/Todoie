import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

const Todos = ({ todos, addTodo, toggleTodo }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>

      <TodoList {...{ todos, toggleTodo }} />
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array
}

export default connect(
  state => ({
    todos: getEntities('todos')(state)
  }),
  dispatch => ({
    addTodo: (text) => dispatch(actions.submitEntity({ text }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'}))
  })
)(Todos)
