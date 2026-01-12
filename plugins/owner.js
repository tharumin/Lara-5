const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const Jimp = require('jimp')
const fs = require('fs')

cmd({
    pattern: "getsession",
    react: "🛡️",
    alias: ["getses"],
    desc: "Change the Bot number Bio",
    category: "owner",
    use: '.getsession',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isOwner) return await reply('🚩 *You must be a bots owner frist*')
let sesi = await fs.readFileSync('./auth_info_baileys/creds.json')
await conn.sendMessage(from, { document: sesi, mimetype: 'application/json', fileName: 'creds.json', caption: config.SESSION_ID }, { quoted: mek })
//await conn.sendMessage(from , { text: "🚩 *New Bio Added Successfully*" }, { quoted: mek } )
} catch (e) {
reply('🚩 *Error Accurated !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "removepp",
    react: "🛡️",
    alias: ["rmpp"],
    desc: "Remove the botNumber PP",
    category: "owner",
    use: '.removepp',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isOwner) return await reply('🚩 *You must be a bots owner frist*')
await conn.removeProfilePicture(botNumber2)
 await conn.sendMessage(from , { text: "🚩 *Profile Pic Successfully removed*" }, { quoted: mek } )

} catch (e) {
reply('🚩 *Error Accurated !!*\n\n' + e )
l(e)
}
})
//======================================================================
async function generateProfilePicture(media) {
  const jimp = await Jimp.read(media),
    min = jimp.getWidth(),
    max = jimp.getHeight(),
    cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG)
  };
}
cmd({
    pattern: "block",
    react: "🥏",
    alias: ["blck"],
    desc: "To Remove a participant from Group",
    category: "owner",
    use: '.block',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
        if (!isOwner) return await reply('🚩 *You must be a bots owner frist*')
		 const who = m.quoted.sender || from
		if (!who) return reply("🚫 *Couldn't find any user in context*")
		await conn.updateBlockStatus([who], "block")
		await conn.sendMessage(from,{text:`*Successfully blocked*  ✔️`},{quoted:mek })
	
} catch (e) {
 reply(`❌ єяяσя : ${e}`);
console.log(e)
}
})

cmd({
    pattern: "unblock",
    react: "🥏",
    alias: ["unban"],
    desc: "To unblock a number",
    category: "owner",
    use: '.block',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
        if (!isOwner) return await reply('🚩 *You must be a bots owner frist*')
		const htti = m.quoted.sender || from
		if (!htti) return reply("🚫 *Couldn't find any user in context*")
		await conn.updateBlockStatus([htti], "unblock")
		await conn.sendMessage(from,{text:`*Successfully unblocked*  ✔️`},{quoted:mek })
	
} catch (e) {
 reply(`❌ єяяσя : ${e}`);
console.log(e)
}
})

cmd({
        pattern: "restart",
        desc: "To restart bot",
        category: "owner",
	react: "🛡️",
        filename: __filename
    },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isSachintha, isSavi, isSadas, isMani, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isMe)return;
try{    
const { exec } = require("child_process")
reply('SUHAS-MD Restarting...♻')
exec('pm2 restart all')
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply('🚩 *You must be a bots owner frist*')
    reply("🚩 Shutting down...").then(() => process.exit());
})

cmd({
    pattern: "clearchat",
    desc: "Clear chat from the bot.",
    alias: ["clearjid"],
    dontAddCommandList: true,
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {

    if (!isOwner) return reply('🚩 *You must be a bots owner frist*')
    try {
            await conn.modifyChat(from, 'delete');
     
        reply('🚩 *Successfully cleared this chat*')
    } catch (error) {
        reply(`❌ єяяσя : ${error.message}`);
    }
})

cmd({
    pattern: "clearall",
    alias: ["clear"],
    desc: "Clear all chats from the bot.",
    dontAddCommandList: true,
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply('🚩 *You must be a bots owner frist*')
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply('🚩 *Successfully cleared all chats*')
    } catch (error) {
        reply(`❌ єяяσя : ${error.message}`);
    }
})

cmd({
    pattern: "groupjids",
    alias: ["gjids"],
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    use: '.groupjids',
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply('🚩 *You must be a bots owner frist*')

    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`*ALL Group JIDs You Joined:*\n\n${groupJids}`);
});

//=======================================================================
cmd({
    pattern: "setbio",
    desc: "Change your profile status.",
    category: "owner",
    use: ".setbios [new_status]",
    react: "✏️",
    filename: __filename
}, async (conn, mek, m, { reply, q, isMe }) => {
    if (!isMe) return await reply("*You are not the bot's owner or moderator! 🚫*");
    const status = q;
    if (!status) return reply("*Please provide a status to set* 📕");

    await conn.updateProfileStatus(status);
    reply(`*Your status has been updated to:* ${status}`);
});

cmd({
    pattern: "setname",
    desc: "Change your profile name.",
    category: "owner",
    use: ".setname [new_name]",
    react: "✏️",
    filename: __filename
}, async (conn, mek, m, { reply, q, isMe }) => {
    if (!isMe) return await reply("*You are not the bot's owner or moderator! 🚫*");
    const name = q;
    if (!name) return reply("*Please provide a name to set* 📕");

    await conn.updateProfileName(name);
    reply(`*Your name has been updated to:* ${name}`);
});

cmd({
    pattern: "getprofilepic",
    desc: "Get the display picture of a user or group.",
    category: "owner",
    use: ".getprofilepic [id]",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply, isMe }) => {
    if (!isMe) return await reply("*You are not the bot's owner or moderator! 🚫*");
    const ID = m.quoted.sender || from || q.trim();
    if (!id) return reply("*Please provide an ID to fetch the profile picture* 📕");

    const ppUrl = await conn.profilePictureUrl(id, 'image');
    reply(`*Profile picture URL:* ${ppUrl}`);
});

cmd({
    pattern: "setpp",
    desc: "Change your display picture.",
    category: "owner",
    use: ".setpp [image_url]",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { reply, q, isMe }) => {
    if (!isMe) return await reply("*You are not the bot's owner or moderator! 🚫*");
    const jid = conn.user.jid; // Using user's own ID
    const imageUrl = q.trim();
    if (!imageUrl) return reply("*Please provide an image URL to set as your profile picture* 📕");

    await conn.updateProfilePicture(jid, { url: imageUrl });
    reply("*Your profile picture has been updated.*");
})

cmd({
    pattern: "owner",
    desc: "Display owner contact information.",
    react: "🌝",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const vcard = `BEGIN:VCARD\n` +
                      `VERSION:3.0\n` +
                      `FN: Suhas Bro\n` +
                      `ORG: Bot Owner;\n` +
                      `TEL;type=CELL;type=VOICE;waid=+94774132871:+94774132871\n` +
                      `END:VCARD`;

        await conn.sendMessage(from, { 
            contacts: { 
                displayName: `S U H A S  -  M D 🇱🇰`, 
                contacts: [{ vcard }] 
            },  
            quoted: mek 
        });
    } catch (e) {
        console.error(e);
        reply('⚠️ An error occurred while fetching owner information.');
    }
});

