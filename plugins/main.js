const { cmd, commands } = require('../command');
const config = require('../config')
cmd({
    pattern: "downmenu",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*📥 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔. 📥*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};

let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  console.log(e)
}
})

cmd({
    pattern: "searchmenu",
    react: "🔍",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🔍 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔. 🔍*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  console.log(e)
}
})

cmd({
    pattern: "convertmenu",
    react: "🪄",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🪄 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔. 🪄*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  console.log(e)
}
})

cmd({
    pattern: "othersmenu",
    react: "🎐",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🎐 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔. 🎐*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'others'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
    caption: menuc,
    footer: config.FOOTER,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  console.log(e)
}
})

cmd({
  pattern: "ownermenu",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🗣️ 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔. 🗣️*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'owner'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "groupmenu",
  react: "👥",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*👥 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔. 👥*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "logomenu",
  react: "🌌",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🌌 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐋𝐎𝐆𝐎 𝐌𝐄𝐍𝐔. 🌌*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'logo'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "moviemenu",
  react: "🎬",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🎬 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐌𝐎𝐕𝐈𝐄 𝐌𝐄𝐍𝐔. 🎬*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'movie'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "nsfwmenu",
  react: "🫣",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🫣 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐍𝐒𝐅𝐖 𝐌𝐄𝐍𝐔. 🫣\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'nsfw'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "wallpapermenu",
  react: "🏖",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🏖 SUHAS-MD WALLPAPER MENU. 🏖*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'wallpaper'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "newsmenu",
  react: "📰",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*📰 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐍𝐄𝐖𝐒 𝐌𝐄𝐍𝐔. 📰*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'news'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "reactionmenu",
  react: "💩",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*💩 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐑𝐄𝐀𝐂𝐓 𝐌𝐄𝐍𝐔. 💩*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'reaction'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "animemenu",
  react: "🍄",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🍄 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐀𝐍𝐈𝐌𝐄 𝐌𝐄𝐍𝐔. 🍄*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'anime'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "aimenu",
  react: "🧠",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*🧠 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐀𝐈 𝐌𝐄𝐍𝐔. 🧠*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'ai'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})

cmd({
  pattern: "funmenu",
  react: "😂",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `
*😂 𝐒𝐔𝐇𝐀𝐒-𝐌𝐃 𝐅𝐔𝐍 𝐌𝐄𝐍𝐔. 😂\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'fun'){
if(!commands[i].dontAddCommandList){
menuc += `*╭──────────────────❥*
*╎🔖Command :* ${commands[i].pattern}
*╎🏷️Desc :* ${commands[i].desc}
*╎ 🧧Use:* ${commands[i].use}
*╰──────────────────❥*\n\n
`
}}};
let generatebutton = [{
    buttonId: `${prefix}alive`,
    buttonText: {
        displayText: 'GET BOT\'S ALIVE'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT\'S PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: "https://i.ibb.co/HFC0QL8/20250126-101314.jpg",
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
console.log(e)
}
})
