const config = require('../config.json')
const bot = require('../bot')
const ReactionHandler = require('../class/ReactionHandler')

const handleAddReaction = (guildID, emoji, member) => {
    console.log('add')
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
    name: "bindRoleEvent",
    execute: async () => {
        const message = await bot.getMessage(config.menuInfo.channelID, config.menuInfo.messageID)

        console.log(message)

        const reactionListener = new ReactionHandler(message)

        reactionListener.on('add', handleAddReaction)
        reactionListener.on('remove', handleRemoveReaction)
    }
}