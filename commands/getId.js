module.exports = {
    name: 'getId',
    execute: (msg, args) => {
        const regex = /[a-zA-Z:<>]+/g
        args.forEach(arg => console.log(arg.replace(regex, ''), '\n'))
    }
}