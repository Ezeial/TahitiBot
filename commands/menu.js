const bot = require('../bot')
const config = require('../config.json')
const editJsonFile = require("edit-json-file")

const file = editJsonFile(`${__dirname}/../config.json`, {
    autosave: true
})

module.exports = {
    name: 'menu',
    execute: async (msg, args) => {
        // Display Menu
        const message = await bot.createMessage(msg.channel.id, `
**Menu Role**
Choisi tes jeux avec les reactions

${config.emojis.reduce((acc, current, i) => {
    if (i === 1) return `<:${acc.name}:${acc.id}> - ${acc.name}\n\n<:${current.name}:${current.id}> - ${current.name}\n\n`
    return acc + `<:${current.name}:${current.id}> - ${current.name}\n\n`
})}
`) 
        // Reactions

        config.emojis.forEach(async emoji => await message.addReaction(`${emoji.name}:${emoji.id}`))

        // file.set('menuInfo', {
        //     channelID: message.channel.id,
        //     messageID: message.id
        // })
    }
}