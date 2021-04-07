const express = require('express')
const discord = require('discord.js');
const app = express()
const request = require('request');
var setTitle = require('console-title');
const sql = require('sql')
var http = require("https");
var socket = require('net').Socket();
var colors = require('colors');
var axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const servermc = require('minecraft-server-util');
const websocket = require('websocket');
const yt = require('youtube.get-video-info');
const config = require('./auth.json');
const { exec } = require('child_process');
const client = new discord.Client();


















// Rcon setup
const rcon = new servermc.RCON('1.1.1.1', { port: 25575, enableSRV: true, timeout: 5000, password: 'password' }); // These are the default options
const consolediscord = "serverminecrafttest";
// Rconsetup

// Discord Console 
client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'rcon'))
{
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const embed = new discord.MessageEmbed().setTitle('Command')
    .addField('ส่งคำสั่งเรียบร้อย', 'Discord Bot Test Project').setColor('#55E80C');  msg.channel.send(embed);
    rcon.on('output', (message) => console.log(message));

    rcon.connect()
    .then(() => rcon.run(`${args[1]} ${args[2]}`)) // Command
    .then(() => rcon.close())
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error)
    });
}})

// Send Command 1
client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'help'))
{
    const help1 = new discord.MessageEmbed()
    .addField('Help Command',`\r\nConsole : ${config.prefix}rcon [คำสั่ง]`)
    .addField('Add คนเข้า whitelist',`\r\nWhitelist : ${config.prefix}wla [ชือ]`).setColor('#09ECAE'); msg.channel.send(help1);
    
}})

// While list
client.on('message', (msg) => {if(msg.content.startsWith(config.prefix + 'wla'))
{
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    rcon.connect()
    .then(() => rcon.run(`whitelist add ${args[1]}`))
}})
// end Whileist 
// Send Command 2 
//End Discord Discord Console
client.on('ready', () =>{ console.log('Bot is Ready') });
client.login(config.token);
