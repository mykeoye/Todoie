import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities, getEntitiesByVisibility } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import FilterTodo from './components/FilterTodo'

const Todos = ({ todos, addTodo, toggleTodo, filterTodos }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>

      <TodoList {...{ todos, toggleTodo }} />

      <FilterTodo filterTodos={filterTodos} />
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array
}

export default connect(
  state => ({
    todos: getEntitiesByVisibility('todos')(state)
  }),
  dispatch => ({
    addTodo: (text) => dispatch(actions.submitEntity({ text }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'})),
    filterTodos: (filter) => dispatch(actions.setVisibilityFilter({ filter }))
  })
)(Todos)
