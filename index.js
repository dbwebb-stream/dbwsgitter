/**
 * Listen to gitter user joined rooms and proxy these to websockets.
 *
 * User is decided by token in gitter-token.js
 */

'use strict'
const Gitter = require('node-gitter')
const M = require('most')
const R = require('ramda')

const token = require('./gitter-token')
const config = require('./config.js')

process.title = config.processTitle
