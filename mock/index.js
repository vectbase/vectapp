const userApi = require('./userApi')
const delay = require('mocker-api/lib/delay')
const merge = require('webpack-merge')

// All API [api1,api2,api3....]
const apis = [userApi]

// 是否禁用代理
const noProxy = true
const proxy = merge({ _proxy: {
  priority: 'mocker',
  proxy: {
    '/repos/(.*)': 'https://api.github.com/'
    // '/repos/jaywcjlove/webpack-api-mocker': 'https://api.github.com/repos/jaywcjlove/webpack-api-mocker',
  },
  changeHost: true
}
}, ...apis, {'A': 'ss'})

module.exports = (noProxy ? {} : delay(proxy, 100))
