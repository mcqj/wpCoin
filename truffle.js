// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    staging: {
      host: 'localhost',
      port: 8545,
      network_id: 3,
      from: '0x81a8ab9994b9818ce79a794740d28165a1768985'
    }
  }
}
