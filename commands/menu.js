const bot = require('../bot')
const config = require('../config.json')
const ReactionHandler = require('../class/ReactionHandler')

const handleAddReaction = (guildID, emoji, member) => {
    const roles = bot.guilds.find(guild => guild.id === guildID).roles
    if (!roles.find(role => role.name === emoji.name)) return
    const id = roles.find(role => role.name === emoji.name).id
    member.addRole(id)
}

const handleRemoveReaction = (guildID, emoji, userID) => {
    const roles = bot.guilds.find(guild => guild.id === guildID).roles
    if (!roles.find(role => role.name === emoji.name)) return
    const id = roles.find(role => role.name === emoji.name).id
    bot.removeGuildMemberRole(guildID, userID, id)
}

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

        const reactionListener = new ReactionHandler(message)

        reactionListener.on('add', handleAddReaction)
        reactionListener.on('remove', handleRemoveReaction)
    }
}