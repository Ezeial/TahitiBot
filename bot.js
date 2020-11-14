const config = require('./config.json')
const Eris = require('eris')
const bot = new Eris(config.token)

module.exports = bot