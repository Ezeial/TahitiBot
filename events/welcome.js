const bot = require('../bot')
const { welcomeChannel, rolesChannel } = require('../config.json')

module.exports = {
    name: "guildMemberAdd",
    execute: async (guild, member) => {
        const channelId = guild.channels.find(channel => channel.name === welcomeChannel).id
        const linkedChannelId = guild.channels.find(channel => channel.name === rolesChannel).id

        await bot.createMessage(channelId, {   
            embed: {
                image: {
                    url: 'https://cdn.discordapp.com/attachments/531268689668866048/755035061895561336/KRtDL_Kirby_hi2.png'
                }
            },
            content:`Yo <@${member.id}>, bienvenue chez Les Ferarens le discord de l'amusement et de la bienveillance ! N'hésite pas à prendre tes rôles et indiquer les jeux auxquels tu joues dans le salon  :arrow_right:  <#${linkedChannelId}> !`,
            allowedMentions: {
                users: true
            }
        })
    }
}