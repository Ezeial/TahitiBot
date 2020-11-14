const EventEmitter = require('events').EventEmitter;

class ReactionHandler extends EventEmitter {
    constructor(message) {
        super()
        this.bot = message.channel.client
        this.msg = message

        this.addListener = (message, emoji, reactor) => this.addReaction(message, emoji, reactor)
        this.removeListener = (message, emoji, userID) => this.removeReaction(message, emoji, userID)
        
        this.bot.on('messageReactionAdd', this.addListener)
        this.bot.on('messageReactionRemove', this.removeListener)
    }

    filter(message, reactor) {
        return this.msg.id !== message.id || reactor.user.bot
    }

    addReaction(message, emoji, reactor) {
        if (this.filter(message, reactor)) return
        this.emit('add', message.guildID, emoji, reactor)
    }

    removeReaction(message, emoji, userID) {
        this.emit('remove', message.guildID, emoji, userID)
    }
}

module.exports = ReactionHandler