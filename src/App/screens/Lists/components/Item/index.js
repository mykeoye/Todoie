import React, { PropTypes } from 'react'

import { Link } from 'react-router'

const Item = ({ id, name, router }) => (
  <li
    className='ph3 pv3 bb b--light-silver'>
    <Link to={`/lists/${id}`}>{name}</Link>
  </li>
)

Item.propTypes = {
  name: PropTypes.string,
  viewTodos: PropTypes.func
}

export default Item
