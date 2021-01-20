const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')
require('dotenv').config()

client.login(process.env.BOTTOKEN)

client.on('ready',readyDiscord)

client.on('guildMemberAdd' , member => {
    member.guild.channels.get('694556048820011028').send(`Be Server XDXDNation Khosh Omadi ${member} `)
})

function readyDiscord() {
    console.log("ready!")
}

client.on('message',gotMessage)

async function gotMessage(msg) {
    let tokens = msg.content.split(' ')
    if (tokens[0] === "william") {
        if (tokens[1] === 'hello') {
            let replies = ['Hello Sir!', ' Hey Mard' , 'Wassup Bro', 'What can i do for you?','Gol be khodi Gol nie?!!']
            let index = Math.floor(Math.random() * replies.length)
            msg.reply(replies[index])
        } else if (tokens[1] === 'ping'){
            msg.channel.send("Pong 🏓")
        } else if (tokens[1] === 'my' && tokens[2] === 'avatar'){
            msg.reply(msg.author.displayAvatarURL())
        } else if (tokens[1] == 'gif') {
            let keywords = 'peaky blinders'
            if (tokens.length > 2) {
                keywords = tokens.slice(2,tokens.length).join(" ")
            }
            let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfiler=none`
            let response = await fetch(url)
            let json = await response.json()
            let index = Math.floor(Math.random() * json.results.length)
            msg.reply(json.results[index].url)
            msg.channel.send("GIF from Tenor: " + keywords)
        } else if (tokens[1] === 'server') {
            msg.channel.send(`Server Name: ${msg.guild.name} \nTotal Members: ${msg.guild.memberCount}`)
        } else if (tokens[1] === 'user-info') {
            msg.channel.send(`Your Username: ${msg.author.username} \nYour ID: ${msg.author.id}`)
        } else if (tokens[1] === 'kick') {
            const target = msg.mentions.users.first()
            if (target) {
                const targetMember = msg.guild.members.cache.get(target.id)
                targetMember.kick()
                msg.channel.send(`Sir, User ${target} Got Kicked from the Server.`)
            }
        } else if (tokens[1] === "delete") {
            const amount = tokens[2]
            if (amount > 100) { msg.reply("You can't delete more than 100 messages at once.")}
            if (amount < 1) {msg.reply("You have to delete at least 1 message!")}
            if (!amount) {msg.reply("You haven't given an amount of messages You want to delete!")}
            if (isNaN(amount)) {msg.reply("The amount parameter isn't a number!")}

            msg.channel.bulkDelete(amount).then(() => {
                msg.reply(`Deleted ${amount} messages.`).then(mssg => mssg.delete({timeout: 5000}))
            })
        }
    }
}