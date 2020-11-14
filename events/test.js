const bot = require('../bot')
const fs = require('fs')

module.exports = {
    name: "messageCreate",
    execute: async (msg) => {
        if (!msg.author.bot) {
            await bot.createMessage(msg.channel.id, {
                embed: {
                    image: {
                        url: '~/assets/kirby.png',
                        width: 400,
                        height: 400
                    }
                }
            })
        }
    }
}