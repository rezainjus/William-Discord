const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')
require('dotenv').config()

client.login(process.env.BOTTOKEN)

client.on('ready',readyDiscord)

function readyDiscord() {
    console.log("ready!")
}

client.on('message',gotMessage)

async function gotMessage(msg) {
    let tokens = msg.content.split(' ')
    
    if (tokens[0] === 'hello') {
        let replies = ['Hello Sir!', ' Hey Mard' , 'Wassup Bro', 'What can i do for you?','Gol be khodi Gol nie?!!']
        let index = Math.floor(Math.random() * replies.length)
        msg.reply(replies[index])
    }
    else if (tokens[0] == '*gif') {
        let keywords = 'peaky blinders'
        if (tokens.length > 1) {
            keywords = tokens.slice(1,tokens.length).join(" ")
        }
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfiler=none`
        let response = await fetch(url)
        let json = await response.json()
        let index = Math.floor(Math.random() * json.results.length)
        msg.channel.send(json.results[index].url)
        msg.channel.send("GIF from Tenor: " + keywords)
    }
}