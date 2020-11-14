require('dotenv').config()
const Eris = require('eris')
const bot = new Eris(process.env.TOKEN)

module.exports = bot