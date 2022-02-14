'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"development"',
  HTTP_URL: '"http://fretend.vectbase.com:32222"',
  AUTH_PREFIX: '"/auth"',
  AUTHPUBLIC_PREFIX: '"/auth-public"',
  USERRES_PREFIX: '"/userres"',
  WORKSHEET_PREFIX: '""',
  INTERACTIVE_PREFIX: '""',
  DATABASE_PREFIX: '""',
  PIPE_PREFIX: '""',
  QUERYHISTORY_PREFIX: '""',
  WAREHOUSE_PREFIX: '""',
  GRANT_PREFIX: '""'

})
