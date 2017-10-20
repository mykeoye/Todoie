import React, { PropTypes } from 'react'

import classNames from 'classnames'

const Todo = ({ text, completed, toggle, isLast }) => {
  const todoClass = classNames(
    'ph3 pv3 pointer bg-animate hover-bg-light-gray',
    {
      'bb b--light-silver': !isLast,
      'strike i': completed
    }
  )

  return (
    <li className={todoClass} onClick={() => toggle()}>{text}</li>
  )
}

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  isLast: PropTypes.bool
}

export default Todo
