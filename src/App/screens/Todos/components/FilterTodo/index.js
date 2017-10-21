import React, { PropTypes } from 'react'
import filters from '../../../../stores/resources/filters'

import FilterButton from '../FilterButton'

const FilterTodo = ({ filterTodos, currentFilter }) => (
  <div className='center mw6'>
    <h4 className='f4 bold center mw6'>Show</h4>

    <FilterButton filter={filters.SHOW_ALL} {...{filterTodos, currentFilter}}>All</FilterButton>
    <FilterButton filter={filters.SHOW_ACTIVE} {...{filterTodos, currentFilter}}>Active</FilterButton>
    <FilterButton filter={filters.SHOW_COMPLETED} {...{filterTodos, currentFilter}}>Completed</FilterButton>
  </div>
)

FilterTodo.propTypes = {
  filterTodos: PropTypes.func,
  currentFilter: PropTypes.string
}

export default FilterTodo
