const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv')

client.login(process.env.TOKEN)

client.on('ready',readyDiscord)

function readyDiscord() {
    console.log("ready!")
}

client.on('message',gotMessage)

function gotMessage(msg) {
    if (msg.content === 'hello') {
        let replies = ['Hello Sir!', ' Hey Mard' , 'Wassup Bro', 'What can i do for you?','Gol be khodi Gol nie?!!']
        var index = Math.floor(Math.random() * replies.length)
        msg.reply(replies[index])
    }
}