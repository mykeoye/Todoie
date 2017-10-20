import React, { PropTypes } from 'react'

import { Field, reduxForm } from 'redux-form'

const AddTodo = ({ handleSubmit }) => {
  return (
    <form className='mw6 center pa4 mb4 br2 ba b--black-10' onSubmit={handleSubmit}>
      <fieldset className='cf bn ma0 pa0'>
        <legend className='pa0 f5 f4-ns mb3 black-80'>Add todo</legend>
        <div className='cf'>
          <Field
            className='f6 f5-l input-reset fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2 br--left ba b--light-silver'
            placeholder='New todo'
            name='todo'
            type='text'
            component='input'
          />

          <button
            className='f6 f5-l button-reset fl pv3 tc bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2 br--right ba b--black-70'
            type='submit'
          >
            Add
          </button>
        </div>
      </fieldset>
    </form>
  )
}

AddTodo.propTypes = {
  className: PropTypes.string
}

export default reduxForm({form: 'addTodo'})(AddTodo)
