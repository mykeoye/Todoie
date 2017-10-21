import React, { PropTypes } from 'react'

const FilterButton = ({ filter, currentFilter, children, filterTodos }) => (
  <button
    className='f6 mr3 link bn br-pill ph3 pv2 mb2 dib white bg-dark-blue'
    onClick={() => filterTodos(filter)}>
    {children}
  </button>
)

FilterButton.propTypes = {
  filter: PropTypes.string,
  currentFilter: PropTypes.string,
  filterTodo: PropTypes.func
}

export default FilterButton
