const config = require('../config');
const os = require('os');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

// Default caption
var cap = '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*';

    
cmd({
  pattern: "menu",
  react: "📃",
  alias: ["panel","list","commands"],
  desc: "Get bot's command list.",
  category: "bot",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m,{from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
const buttons = [
{buttonId: prefix + 'downmenu' , buttonText: {displayText: 'DOWNLOAD MENU'}, type: 1},
{buttonId: prefix + 'searchmenu' , buttonText: {displayText: 'SEARCH MENU'}, type: 1},
{buttonId: prefix + 'convertmenu' , buttonText: {displayText: 'CONVERT MENU'}, type: 1},
{buttonId: prefix + 'logomenu' , buttonText: {displayText: 'LOGO MENU'}, type: 1},
{buttonId: prefix + 'othersmenu' , buttonText: {displayText: 'OTHERS MENU'}, type: 1},
{buttonId: prefix + 'ownermenu' , buttonText: {displayText: 'OWNER MENU'}, type: 1},
{buttonId: prefix + 'groupmenu' , buttonText: {displayText: 'GROUP MENU'}, type: 1},
{buttonId: prefix + 'moviemenu' , buttonText: {displayText: 'MOVIE MENU'}, type: 1},
{buttonId: prefix + 'nsfwmenu' , buttonText: {displayText: 'NSFW MENU'}, type: 1},
{buttonId: prefix + 'wallpapermenu' , buttonText: {displayText: 'WALLPAPER MENU'}, type: 1},
{buttonId: prefix + 'newsmenu' , buttonText: {displayText: 'NEWS MENU'}, type: 1},
{buttonId: prefix + 'reactionmenu' , buttonText: {displayText: 'REACTION MENU'}, type: 1},
{buttonId: prefix + 'animemenu' , buttonText: {displayText: 'ANIME MENU'}, type: 1},
{buttonId: prefix + 'aimenu' , buttonText: {displayText: 'AI MENU'}, type: 1},
{buttonId: prefix + 'funmenu' , buttonText: {displayText: 'FUN MENU'}, type: 1}
]
const buttonMessage = {
  image: 'https://i.ibb.co/HFC0QL8/20250126-101314.jpg',
  caption: `*👋 Hello ${pushname}*

*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」──○●►*
*│◈ ᴏᴡɴᴇʀ : ꜱᴜʜᴀꜱ ʙʀᴏ*
*│◈ ᴠᴇʀꜱɪᴏɴ : 9.0.0*
*│◈ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*╰─────────────────○●►*
`,
  footer: config.FOOTER,
  buttons: buttons,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
