import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import * as actions from 'App/stores/resources/actions'
import { getChildEntitiesByFilter } from 'App/stores/resources'
import { getVisibilityFilter } from 'App/stores/resources/visibility'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import FilterTodo from './components/FilterTodo'

const Todos = ({ params, todos, addTodo, toggleTodo, filterTodos, currentFilter }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo, params.listId)
        reset()
      }} />

      <h1 className='f4 bold center mw6'>All Todos</h1>

      <TodoList {...{ todos, toggleTodo }} />

      <FilterTodo {...{filterTodos, currentFilter}} />
    </section>
  )
}

Todos.propTypes = {
  todos: PropTypes.array
}

export default withRouter(connect(
  (state, location) => ({
    todos: getChildEntitiesByFilter('todos', 'lists', location.params.listId)(state),
    currentFilter: getVisibilityFilter('todos')(state)
  }),
  dispatch => ({
    addTodo: (text, listID) => dispatch(actions.submitEntity({ text, listID }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'})),
    filterTodos: (filter) => dispatch(actions.setVisibilityFilter({ filter }))
  })
)(Todos))
