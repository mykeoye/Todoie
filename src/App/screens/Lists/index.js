import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddItem from './components/AddItem'
import ItemList from './components/ItemList'

const Lists = ({ items, addList }) => (
  <section className='pa pa5-ns'>
    <AddItem onSubmit={({list}, _, {reset}) => {
      addList(list)
      reset()
    }} />

    <h1 className='f4 bold center mw6'>All items</h1>

    <ItemList {...{items}} />

  </section>
)

Lists.propTypes = {
  items: PropTypes.array
}

export default connect(
  state => ({
    items: getEntities('lists')(state)
  }),
  dispatch => ({
    addList: (name) => dispatch(actions.submitEntity({ name }, {type: 'lists'}))
  })
)(Lists)
