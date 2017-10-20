// From: https://gist.github.com/gutosanches/def6258889546c364c083b9eefb6244a

import snakeCase from 'lodash/snakeCase'

/**
 * Convert a object with action creators created with
 * redux-actions createAction to a object with these
 * functions names as action types
 *
 * "someAction" becomes "SOME_ACTION"
 *
 * @param  {Object} actions Object with action creators
 * @return {Object}         Object with action types constants
 */

export default (actions) => {
  const constants = {}
  Object.keys(actions).forEach(action => {
    const actionType = actions[action].toString()

    const actionConstant = snakeCase(action).toUpperCase()
    constants[actionConstant] = actionType
  })
  return constants
}
