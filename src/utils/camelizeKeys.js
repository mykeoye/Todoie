import _ from 'lodash'

function getVal (val, caseFn) {
  if (_.isPlainObject(val)) return camelizeObj(val, caseFn)
  return val
}

function camelizeObj (obj, caseFn = 'camelCase') {
  const newObj = {}

  if (!_.endsWith(caseFn, 'Case')) {
    throw new Error('caseFn needs to be a lodash function to convert string to a specific case')
  }

  _.forEach(obj, (val, key) => {
    newObj[_[caseFn](key)] = getVal(val, caseFn)
  })

  return newObj
}

function camelizeArr (arr, caseFn) {
  return arr.map(obj => camelizeObj(obj, caseFn))
}

export default function camelize (node) {
  if (_.isArray(node)) return camelizeArr(node)
  if (_.isObject(node)) return camelizeObj(node)

  return node
}

export function decamelizeKeys (node, toCase = 'snakeCase') {
  if (_.isArray(node)) return camelizeArr(node, toCase)
  if (_.isObject(node)) return camelizeObj(node, toCase)

  return node
}
