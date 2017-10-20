// From: https://gist.github.com/gutosanches/3d755a1522a272ab13dabcfd2b265e62

/**
 * Create valid redux reducer with action types as object keys and values as
 * functions, instead of using Switch Statement
 *
 * Use it like this:
 *
 * `createReducer({
 *  // optional if you set a initial state as the second argument
 *   initialState: {},
 *
 *   SOME_ACTION_TYPE: (state, action) => {
 *     //...do something
 *     return state
 *   }
 * }, {// some initial state }) // optional if you set it above
 * `
 *
 * @param  {Object} reducerMap      Actions handlers and/or initial state
 * @param  {*} [initialState=reducerMap.initialState]
 * @return {function}
 */

export default (reducerMap, initialState) => {
  if (typeof reducerMap.initialState === 'undefined' && typeof initialState === 'undefined') {
    throw new Error('initialState is undefined')
  }

  if (typeof reducerMap.initialState !== 'undefined' && typeof initialState === 'undefined') {
    initialState = reducerMap.initialState
  }

  return (state = initialState, action) => {
    const reducer = action && reducerMap[action.type]
    return reducer ? reducer(state, action) : state
  }
}
