const config = require('./config.json')
const fs = require('fs')
const bot = require('./bot')

// Command handler
fs.readdirSync('./commands/').forEach(file => {
    const command = require(`./commands/${file}`)
    bot.on('messageCreate', (msg) => {
        const args = msg.content.split(' ').filter((e, i) => i != 0)
        if (msg.content.startsWith(`${config.prefix}${command.name}`)) command.execute(msg, args)
    })
})

// Event handler
fs.readdirSync('./events/').forEach(file => {
    const event = require(`./events/${file}`)
    bot.on(event.name, event.execute)
})

bot.on('ready', () => {
    bot.emit('bindRoleEvent')
    console.log('listening on tahiti server')
})

bot.connect();