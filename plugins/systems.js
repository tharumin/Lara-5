const config = require('../config')
const os = require('os')
const util = require('util')
const { cmd, commands } = require('../command')
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  getvip,
  getban,
  getdev,
  getbangc,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
  fetchBuffer,
  getFile,
} = require("../lib/functions");
var cap = config.FOOTER

cmd({
    pattern: "ping",
    react: "⚡",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    dontAddCommandList: true,
    use: '.ping',
    category: "bot",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '```Pinging To SUHAS-MD.❤```'  }, { quoted: mek } )
var final = new Date().getTime();
return await conn.edit(ping, '*Pong*\n *' + (final - inital) + ' ms* ' )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
 


cmd({
    pattern: "system",
    react: "🎑",
    alias: ["os","cpu"],
    desc: "Check bot\'s system info",
    dontAddCommandList: true,
    category: "bot",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, ppuser, reply}) => {
try{
  let totalStorage = Math.floor(os.totalmem() / 1024 / 1024) + 'MB'
  let freeStorage = Math.floor(os.freemem() / 1024 / 1024) + 'MB'
  let cpuModel = os.cpus()[0].model
  let cpuSpeed = os.cpus()[0].speed / 1000
  let cpuCount = os.cpus().length
  let hostname = os.hostname()

  let mes = `
*⚙️ SUHAS-MD SYSTEM INFO. ⚙️*

  ◈ *Owner*: Suhas Bro
  ◈ *Version*: V.9.0.0
  ◈ *Type*: WhatsApp Plugins
  ◈ *Runtime*: ${runtime(process.uptime())}
  ◈ *Os Name*: ${hostname}
  ◈ *Total Ram*: ${totalStorage}
  ◈ *Free Ram*: ${freeStorage}
  ◈ *CPU Model*: ${cpuModel}
  ◈ *CPU Speed*: ${cpuSpeed} GHz
  ◈ *CPU Cores*: ${cpuCount} 
  
> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`

await conn.sendMessage(from, { image: {url: `https://t4.ftcdn.net/jpg/04/64/21/59/360_F_464215993_LWZKZ52fQKt4YDQ43b50koqZgn9WxHzA.jpg`}, caption: mes }, { quoted: mek })
    
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

const {
  downloadContentFromMessage
} = require('@whiskeysockets/baileys')

cmd({
    pattern: "vv",
    react: "👀",
    alias: ["rvo"],
    category: "others",
    dontAddCommandList: true,
    use: '.vv',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
const quot = m.msg.contextInfo.quotedMessage.viewOnceMessageV2;
if(quot)
{
if(quot.message.imageMessage) 
{ console.log("Quot Entered") 
   let cap = quot.message.imageMessage.caption;
   let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage)
   return conn.sendMessage(m.chat,{image:{url : anu},caption : cap })
}
if(quot.message.videoMessage) 
{
   let cap = quot.message.videoMessage.caption;
   let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage)
   return conn.sendMessage(m.chat,{video:{url : anu},caption : cap })
}
 
}
       
} catch(e) {  console.log("error" , e ) }     

       
if(!m.quoted) return m.reply("```Uh Please Reply A ViewOnce Message```")           
if(m.quoted.mtype === "viewOnceMessage")
{ console.log("ViewOnce Entered") 
 if(m.quoted.message.imageMessage )
{ 
  let cap = m.quoted.message.imageMessage.caption;
  let anu = await conn.downloadAndSaveMediaMessage(citel.quoted.message.imageMessage)
  conn.sendMessage(m.chat,{image:{url : anu},caption : cap })
}
else if(m.quoted.message.videoMessage )
{
  let cap = m.quoted.message.videoMessage.caption;
  let anu = await conn.downloadAndSaveMediaMessage(citel.quoted.message.videoMessage)
  conn.sendMessage(m.chat,{video:{url : anu},caption : cap })
}

}
else return m.reply("```This is Not A ViewOnce Message.⁉️```")
})   
