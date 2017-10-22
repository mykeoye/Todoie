import React, { PropTypes } from 'react'

const Item = ({ name, viewTodos }) => (
  <li
    onClick={() => viewTodos()}
    className='ph3 pv3 bb b--light-silver'>
    {name}
  </li>
)

Item.propTypes = {
  name: PropTypes.string,
  viewTodos: PropTypes.func
}

export default Item
