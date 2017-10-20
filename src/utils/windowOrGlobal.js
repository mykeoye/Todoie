'use strict'

// From https://gist.github.com/gutosanches/d259502b9d71382cf7bffba77bc9fdd6

/*
 * Borrowed from https://github.com/purposeindustries/window-or-global
 *
 * Use this to get the global object both on server and client side.
 * No more window is not defined errors, just peace and flowers.
 *
 * It's really useful in case of universal (or isomorphic) code, for
 * example, when you'd like to render a React component both on client
 * and server side
 */

module.exports = (typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  this
