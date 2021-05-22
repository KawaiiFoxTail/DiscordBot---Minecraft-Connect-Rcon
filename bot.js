const express = require('express')
const discord = require('discord.js');
const app = express()
const request = require('request');
var setTitle = require('console-title');
var http = require("https");
var socket = require('net').Socket();
var colors = require('colors');
var axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const servermc = require('minecraft-server-util');
const status = require('minecraft-server-status');
const websocket = require('websocket');
const yt = require('youtube.get-video-info');
const config = require('./auth.json');
const user = require('./user.json');
const { exec } = require('child_process');
const client = new discord.Client();

// colors
var red = '#FF0000';
var green = '#61FF00';
var blue = '00FFD8';
var yellow = 'FBFF00';
var magenta = 'D500FF';
// color 

// function
// end function
// Rcon setup
const rcon = new servermc.RCON(config.serverip, { port: 25575, enableSRV: true, timeout: 5000, password: config.serverpassword }); // These are the default options
// Rconsetup

// Discord Console 
client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'rcon'))
{
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const embed = new discord.MessageEmbed().setColor(magenta).setTitle('ส่งคำสั่งแล้วครับ').setTimestamp().setFooter('บอทโดย OhayoOniiChan#5480', msg.author.avatarURL()); msg.channel.send(embed);
    rcon.on('output', (message) => console.log(message));
    if(args[4] === 'undefined') {
        rcon.connect()
        .then(() => rcon.run(`${args[1]} ${args[2]} ${args[3]} ${args[4]}`))
        .then(() => rcon.close())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        })
    }else if(args[3] === 'undefined'){
        rcon.connect()
        .then(() => rcon.run(`${args[1]} ${args[2]} ${args[3]}`)) // Command
        .then(() => rcon.close())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        })
    } else {
        rcon.connect()
        .then(() => rcon.run(`${args[1]} ${args[2]}`)) // Command
        .then(() => rcon.close())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        })
    }
}})

// Send Command 1
client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'help'))
{
    const help1 = new discord.MessageEmbed().setTimestamp().setFooter('บอทโดย OhayoOniiChan#5480',msg.author.avatarURL()).setThumbnail('https://cdn.discordapp.com/icons/591243593348546591/4a31b20b74412a6d68fa78b80270d1d5.png?size=512').setTitle('วิธีการใช้บอท')
    .addField('คำสั่งทั่วไป',`\r\nConsole : ${config.prefix}rcon [คำสั่ง]`)
    .addField('Add คนเข้า whitelist',`\r\nWhitelist : ${config.prefix}whilelist [ชือ]`).setColor(blue); msg.channel.send(help1);
    
}})

client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'stop'))
{
    const help1 = new discord.MessageEmbed().setTimestamp().setTitle('ปิดเซิฟแล้ว')
    rcon.connect()
        .then(() => rcon.run(`stop`)) // Command
        .then(() => rcon.close())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        })
}})

// While list
client.on('message', (msg) => {if(msg.content.startsWith(config.prefix + 'whilelist'))
{
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    rcon.connect()
    .then(() => rcon.run(`whitelist add ${args[1]}`))
    .then(() => rcon.run(`whitelist reload`))
    .then(() => rcon.close())
}})
// end Whileist 
// Status Server

client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'start')){ // KaWaiiFoxTail Server
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const x = 'skyserver';
    const y = 'lemonserver';

    if(args[1] === x) {
        const bat = exec('nimo.bat');
        //bat.stdout.on('data', (data) => {
            //console.log(data.toString());
         // });
        
          //bat.stderr.on('data', (data) => {
           // console.error(data.toString());
         // });
    } else if(args[1] === y) {
        const bat1 = exec('load.bat');
        bat1.stdout.on('data', (data) => {
            console.log(data.toString());
          });
        
          bat1.stderr.on('data', (data) => {
            console.error(data.toString());
          });
    }
    if(args[1] === x) {
        const start = new discord.MessageEmbed().setTitle('กำลังเปิดเซิฟ >  '+ x +'  | ตัวเปิดเซิฟ = Spigot 1.16.5').setColor('#5DFF00'); msg.channel.send(start);
        const bwt = new discord.MessageEmbed().setTitle('เน็ตเซิฟ 100MB | IP : ').setColor('#5DFF00'); msg.channel.send(bwt)
    }else if(args[1] === y){
        const start = new discord.MessageEmbed().setTitle('กำลังเปิดเซิฟ > '+ y +'  | ตัวเปิดเซิฟ = Spigot 1.16.5').setColor('#5DFF00'); msg.channel.send(start);
        const bwt = new discord.MessageEmbed().setTitle('เน็ตเซิฟ 100MB | IP : ').setColor('#5DFF00'); msg.channel.send(bwt)
    }
}});
//End Status Server
client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'intro')){
    const start = new discord.MessageEmbed().setTitle('เปิดเซิฟมายคราฟ ฟรี โดย KaWaii & TkKung & Phawat').setColor('#5DFF00'); msg.channel.send(start);
}});

client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'add'))
{
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const start = new discord.MessageEmbed().setTitle(`กำลังติดตั้ง ${args[1]}`).setColor('#5DFF00'); msg.channel.send(start);
    console.log(`Request Install : ${args[1]} `)
}});
// Help Command 1
client.on('message', (msg) => { if(msg.content === `${config.prefix}help`)
{
  const helpem = new discord.MessageEmbed().setTitle('คำสั่งทั้งหมด').setFooter('Cr. 𝓞𝓱𝓪𝔂𝓸𝓞𝓷𝓲𝓲𝓒𝓱𝓪𝓷#5480', 'https://i.pinimg.com/originals/5a/62/b6/5a62b68015a37749453049bf6614bbb3.gif').setThumbnail('https://1.bp.blogspot.com/-qjMcFSZPOdE/XSSPVbJcbOI/AAAAAAA1pH8/VeOlq0Zg9vkF21zH1HbwRIXXSxNTCbiXQCLcBGAs/s1600/AW3945234_00.gif').setColor('#FF9E00')
  .addFields(
        { name: 'Custom World', value: `${config.prefix}add customworld [server id] ` },
        { name: 'Plugin', value: `${config.prefix}add  ชื่อplugin [server id] <- ข้อ id ได้ที่ KawaiiFoxTail` },
        { name: 'Onlinemode', value: `${config.prefix}add true,false [server id] <- ข้อ id ได้ที่ KawaiiFoxTail` },
        { name: 'Server', value: `${config.prefix}add เซิฟ <-- Spigot, Paper, Vanila,` },
        { name: 'Ex.', value: `${config.prefix}add customworld, worldedit antixray, false, paper` },

    ); msg.channel.send(helpem);
  msg.react('✅');
}});

// op
// end op
// User
// end User
//End Discord Discord Console
client.on('ready', () =>{ console.log('Bot is Ready') });
client.login(config.token);
