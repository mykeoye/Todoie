import React, { PropTypes } from 'react'
import filters from '../../../../stores/resources/filters'

import FilterButton from '../FilterButton'

const FilterTodo = ({ filterTodos }) => (
  <div className='center mw6'>
    <h4 className='f4 bold center mw6'>Show</h4>

    <FilterButton filter={filters.SHOW_ALL} {...{filterTodos}}>All</FilterButton>
    <FilterButton filter={filters.SHOW_ACTIVE} {...{filterTodos}}>Active</FilterButton>
    <FilterButton filter={filters.SHOW_COMPLETED} {...{filterTodos}}>Completed</FilterButton>
  </div>
)

FilterTodo.propTypes = {
  filterTodos: PropTypes.func
}

export default FilterTodo
