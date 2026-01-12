const config = require('../config')
const fg = require('api-dylux');
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const cheerio = require('cheerio')
const axios = require("axios")
const fetch = require('node-fetch')
const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');
const vm = require('vm')
const os = require("os");
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');



const Messages = {};
let wm = config.FOOTER
const l = console.log
var desct = "It search on chatgpt ai for what you provided."
var needus = "*Please give me words to search on chatgpt ai !*" 
var cantf  = "*Server is busy. Try again later.!*"

cmd({
    pattern: "blackbox",
    react: '👾',
    desc: "Blackbox ai chat",
    category: "ai",
    use: '.blackbox *<Your Question>*',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply('Need a keyword')
var res = (await fetchJson('https://apitest1-f7dcf17bd59b.herokuapp.com/ai/blackbox?prompt=' + q))

return await reply(res.result)
} catch (e) {
reply('Unable to generate')
l(e)
}
})

async function textToImage(text) {
    try {
        const { data } = await axios.get(`https://tti.photoleapapp.com/api/v1/generate?prompt=${encodeURIComponent(text)}`);
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

cmd({
    pattern: "photoleap",
    alias: ["plai"],
    react: '🤖',
    category: "ai",
    desc: "Convert given text to an AI image.",
    use: '.photoleap *<Your Prompt>*',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("*Example: .photoleap woman,hair cut color red,full body,bokeh*");

        const data = await textToImage(q);
        if (!data || !data.result_url) {
            return reply("⚠️ Unable to generate image. Please try again later.");
        }

        await conn.sendMessage(from, { image: { url: data.result_url }, caption: config.FOOTER }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("*Server is busy. Try again later!*");
    }
});

async function aiArtGenerator(prompt) {
  try {
    const response = await fetch("https://ai-api.magicstudio.com/api/ai-art-generator", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://magicstudio.com",
        Referer: "https://magicstudio.com/ai-art-generator/"
      },
      body: new URLSearchParams({
        prompt: prompt,
        output_format: "bytes",
        user_profile_id: "null",
        anonymous_user_id: "a584e30d-1996-4598-909f-70c7ac715dc1",
        request_timestamp: Date.now(),
        user_is_subscribed: "false",
        client_id: "pSgX7WgjukXCBoYwDM8G8GLnRRkvAoJlqa5eAVvj95o"
      })
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.arrayBuffer();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

cmd({
    pattern: "aiartgen",
    alias: ["aiart"],
    react: '📷',
    desc: "Generate Images using Bing AI",
    category: "ai",
    use: '.aiart *<prompt>*',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await  reply("*Give me a prompt to generate images*")
 const aiArt = await aiArtGenerator(q)
 await conn.sendMessage(from, { image: Buffer.from(aiArt) , caption: wm }, { quoted: mek });
} catch (e) {
reply('Unable to generate images to the given prompt')
console.log(e)
}
})

cmd({
    pattern: "ai",
    alias: ["chatgpt", "gpt"],
    desc: "Ai chat.",
    react: "🧠",
    use: ".ai <text>",
    category: "ai",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Fixed the URL formatting issue with template literals and quotes
        let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/chatgpt?q=${q}`);
        
        // Sending message with context info, and fixing reply structure
        await conn.sendMessage(from, {
            text: data.result,
            contextInfo: {
                mentionedJid: ['94774132871@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363371157309766@newsletter',
                    newsletterName: "S U H A S  -  M D 🇱🇰",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
                    body: '✨ 𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 💕',
                    mediaType: 1,
                    sourceUrl: "https://github.com/SUHAS-BRO/SUHAS-MD",
                    thumbnailUrl: 'https://i.ibb.co/N6nWD9m/20250128-100821.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });
    } catch (e) {
        // Log the error and reply with a better formatted error message
        console.log(e);
        reply(`Error: ${e.message || e}`); // Improved error message reply
    }
});

cmd({
    pattern: "goodyai",
    alias: ["gai", "goodgpt"],
    desc: "Ai chat.",
    react: "🧠",
    use: ".goodyai <text>",
    category: "ai",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Fixed the URL formatting issue with template literals and quotes
        let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/goodyai?q=${q}`);
        
        // Sending message with context info, and fixing reply structure
        await conn.sendMessage(from, {
            text: data.result,
            contextInfo: {
                mentionedJid: ['94774132871@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363371157309766@newsletter',
                    newsletterName: "S U H A S  -  M D 🇱🇰",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
                    body: '✨ 𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 💕',
                    mediaType: 1,
                    sourceUrl: "https://github.com/SUHAS-BRO/SUHAS-MD",
                    thumbnailUrl: 'https://i.ibb.co/N6nWD9m/20250128-100821.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });
    } catch (e) {
        // Log the error and reply with a better formatted error message
        console.log(e);
        reply(`Error: ${e.message || e}`); // Improved error message reply
    }
});

//alive in start.

cmd({
    pattern: "alive",
    desc: "Bot online test",
    react: "🤗",
    category: "bot",
    use: '.alive',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
 let push = [];
         {       
let cap = `👋 𝗛𝗶 ${pushname}

 ♡ _♫__♡
║║╔║║╔╗ ♫
╠╣╠║║║║
║║╚╚╚╚╝ ♫  

*🧚‍♂️𝙸 𝚊𝚖 𝙰𝚕𝚒𝚟𝚎 𝙽𝚘𝚠.🧚‍♂️*

🧚‍♂️𝙄 𝘼𝙢 𝙎𝙪𝙝𝙖𝙨 𝙋𝙖𝙩𝙝𝙨𝙞𝙣𝙙𝙪.
🧚‍♂️𝙎𝙐𝙃𝘼𝙎-𝙈𝘿 𝙒𝙝𝙖𝙩𝙨𝘼𝙥𝙥 𝘽𝙤𝙩 𝙊𝙬𝙣𝙚𝙧.
🧚‍♂️𝙎𝙪𝙗𝙨𝙘𝙧𝙞𝙗𝙚 𝙈𝙚 𝙤𝙣 𝙔𝙤𝙪𝙩𝙪𝙗𝙚 𝙁𝙤𝙧 𝙈𝙤𝙧𝙚 𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣𝙨...

👋Hey...! I'm Suhas Pathsindu.(Suhas Bro). Follow Us & Shere Channel.💛


*➟➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

*🏮ꜱᴜʙꜱᴄʀɪʙᴇ ᴜꜱ* ➟https://youtube.com/@suhasbro

*💡ꜰᴏʟʟᴏᴡ ᴜꜱ* ➟https://whatsapp.com/channel/0029VagKNUe96H4IdMbr9f2o

*✨ᴡᴇʙ ꜱɪᴛᴇ* ➠ https://suhas-bro.vercel.app/

*🎉ᴛᴇʟᴇɢʀᴀᴍ* ➠https://t.me/suhasbro

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟➟*


*_🗣️Sʜᴇʀᴇ Oᴜʀ YᴏᴜTᴜʙᴇ Cʜᴀɴɴᴇʟ Lɪɴᴋ & WʜᴀᴛꜱAᴘᴘ Cʜᴀɴɴᴇʟ Lɪɴᴋ Wɪᴛʜ Yᴏᴜʀ Fʀɪᴇɴᴅꜱ...💙_*

`;
          let foot = `> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;
          const mediaMessage = await prepareWAMessageMedia({ image: { url: `https://i.ibb.co/HFC0QL8/20250126-101314.jpg` } }, { upload: conn.waUploadToServer });
          push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: cap
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: foot
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: `Hi ${pushname}`,
              subtitle: 'SuhasBro💕',
              hasMediaAttachment: true,
              ...mediaMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                  {
                  "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"YouTube 💗\",\"url\":\"https://youtube.com/@suhasbro\",\"merchant_url\":\"https://www.google.com\"}"
                  },
                  {
                     "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"Developer 👤\",\"url\":\"https://www.whatsapp.com/channel/0029Vb2qCQi0LKZKDYT7dl0q\",\"merchant_url\":\"https://www.google.com\"}"
                  },
                  {
                     "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"GitHub 🗃️\",\"url\":\"https://github.com/SUHAS-BRO/SUHAS-MD\",\"merchant_url\":\"https://www.google.com\"}"
                  },
                  {
                     "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"WhatsApp 💚\",\"url\":\"https://www.whatsapp.com/channel/0029Vb2qCQi0LKZKDYT7dl0q\",\"merchant_url\":\"https://www.google.com\"}"
                  }      
              ]
            })
          });
        }   
        let suhas = `
*_🎉SUHAS-MD WhatsApp Bot.🎉_*

Version :- 9.0.0
Owner  :- Suhas Pathsindu
Total CMD :- 200+
        
        
 *✨ Rᴇᴘʟʏ Bᴇʟᴏᴡ Tʜᴇ Nᴜᴍʙᴇʀ*

 *1*  |  *𝗔𝗹𝗹 𝗠𝗲𝗻𝘂*
 *2*  |  *𝗣𝗶𝗻𝗴*
 *3*  |  *𝗕𝗼𝘁 𝗥𝗲𝗽𝗼*
 *4*  |  *𝗕𝗼𝘁 𝗢𝘄𝗻𝗲𝗿*
        `;
        let foot2 = `> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;
        const msg = generateWAMessageFromContent(from, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: suhas
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: foot2
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  hasMediaAttachment: false
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards: push
                }),
                contextInfo: {
                      mentionedJid: ['94774132871@s.whatsapp.net'], 
                      forwardingScore: 999,
                      isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363371157309766@newsletter',
                      newsletterName: '✨S𝚄𝙷𝙰𝚂-M𝙳💗',
                      serverMessageId: 143
                    }
                    }
              })
            }
          }
        }, {quoted:mek});
       const suhasSend = await conn.relayMessage(from, msg.message, {
          messageId: msg.key.id
        });
    console.log('Button Send Sucsses');
    
     const messageID = msg.key.id; // Save the message ID for later reference


        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
            if (isReplyToSentMsg) {
                if (messageType === '1') {
                    // Handle option 1 (Audio File)
                    let list = `
🧬𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 𝗔𝗟𝗟 𝗠𝗘𝗡𝗨💗

🧬◦ *ᴄʀᴇᴀᴛᴏʀ* : ꜱᴜʜᴀꜱ ᴘᴀᴛʜꜱɪɴᴅᴜ⚡
🧬◦ *ᴠᴇʀsɪᴏɴs* : ᴠ.9.0.0⚡
🧬◦ *ᴍᴇɴᴜ ᴄᴍᴅ* : ᴍᴇɴᴜ⚡
🧬◦ *ꜱᴜʙꜱᴄʀɪʙᴇ ᴍʏ ʏᴛ ᴄʜᴀɴɴᴇʟ* :  https://youtube.com/@suhasbro
🧬◦ *ᴊᴏɪɴ ᴍʏ ᴄʜᴀɴɴᴇʟ* :  https://www.whatsapp.com/channel/0029Vb2qCQi0LKZKDYT7dl0q


*╭─ 乂 🧠 ＡＩ 🧠 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .aiimg*
*╎🔖 Dᴇꜱᴄ-  Create a Image Using AI.*
*╎*
*╎🏷️Cᴍᴅ -  .aiimg1/.aiimg2/.aimg3*
*╎🔖 Dᴇꜱᴄ-  Create a Image Using AI.*
*╎*
*╎🏷️Cᴍᴅ -  .imaggen/.imggen1/.imggen2*
*╎🔖 Dᴇꜱᴄ-  Create a Image Using AI.*
*╎*
*╎🏷️Cᴍᴅ -  .imggen3/.imggen4/.imggen5*
*╎🔖 Dᴇꜱᴄ-  Create a Image Using AI.*
*╎*
*╎🏷️Cᴍᴅ -  .ai/.ai1/.ai2*
*╎🔖 Dᴇꜱᴄ-  Chat with AI.*
*╎*
*╎🏷️Cᴍᴅ -  .gpt/.chatgpt*
*╎🔖 Dᴇꜱᴄ-  Chat with Gpt4*
*╎*
*╎🏷️Cᴍᴅ -  .dalle*
*╎🔖 Dᴇꜱᴄ-  Chat with Black Box*
*╎*
*╰───────────────────◦•◦❥•*

*╭─ 乂 🤭 F U N 🤭 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .fact* 
*╎🔖 Dᴇꜱᴄ-  Random Fun Fact.*
*╎*
*╎🏷️Cᴍᴅ -  .hack*
*╎🔖 Dᴇꜱᴄ-  Hacking Your System.*
*╎*
*╎🏷️Cᴍᴅ -  .quote*
*╎🔖 Dᴇꜱᴄ-  Random Quote Text.*
*╎*
*╰───────────────────◦•◦❥•*

*╭─ 乂 🔞 N S F W 🔞 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .pronhub/.phub*
*╎🔖 Dᴇꜱᴄ-  Download 18+ Videos in www.pronhub.com.*
*╎*
*╎🏷️Cᴍᴅ -  .xvsearch/.xvs*
*╎🔖 Dᴇꜱᴄ-  Download 18+ Videos in www.bysex.com.*
*╎*
*╎🏷️Cᴍᴅ -  .xvideo/.xvideodl/.dlxvideo*
*╎🔖 Dᴇꜱᴄ-  Download 18+ Videos in www.bysex.com.*
*╎*
*╎🏷️Cᴍᴅ -  .bysexdl/.dlbysex/.bysexdown*
*╎🔖 Dᴇꜱᴄ-  Download 18+ Videos in www.bysex.com.*
*╎*
*╎🏷️Cᴍᴅ -  .pussybdl/.pussydown*
*╎🔖 Dᴇꜱᴄ-  Download 18+ Videos in www.pussy.com*
*╎*
*╎🏷️Cᴍᴅ -  .hentaivid*
*╎🔖 Dᴇꜱᴄ-  Download 18+ Videos in www.hentaivid.com*
*╎*
*╎🏷️Cᴍᴅ -  .blowjob*
*╎🔖 Dᴇꜱᴄ-  Random Blowjob Pics.*
*╎*
*╎🏷️Cᴍᴅ -  .xneko*
*╎🔖 Dᴇꜱᴄ-  Random xneko Pics.*
*╎*
*╎🏷️Cᴍᴅ -  .xgirl*
*╎🔖 Dᴇꜱᴄ-  Random xgirl Pics.*
*╎*
*╎🏷️Cᴍᴅ -  .trap*
*╎🔖 Dᴇꜱᴄ-  Fetch Random trap Images.*
*╎*
*╎🏷️Cᴍᴅ -  .sexygirl*
*╎🔖 Dᴇꜱᴄ-  Fetch Random sexygirl Images.*
*╎*
*╰───────────────────◦•◦❥•*


*╭─ 乂 📰 N E W S 📰 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .news*
*╎🔖 Dᴇꜱᴄ-  Get English News.*
*╎*
*╎🏷️Cᴍᴅ -  .tech/.technews*
*╎🔖 Dᴇꜱᴄ-  Get Technology News.*
*╎*
*╎🏷️Cᴍᴅ -  .startnews*
*╎🔖 Dᴇꜱᴄ-  Active 24/7 Sinhala News.*
*╎*
*╎🏷️Cᴍᴅ -  .stopnews*
*╎🔖 Dᴇꜱᴄ-  Deactive 24/7 Sinhala News.*
*╎*
*╰───────────────────◦•◦❥•*

*╭─ 乂 ♨️ O Ｔ H E Ｒ ♨️ ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .menu/.list/.help*
*╎🔖 Dᴇꜱᴄ-  Get the Bot Main Menu.*
*╎*
*╎🏷️Cᴍᴅ -  .allmenu/.botmenu*
*╎🔖 Dᴇꜱᴄ-  Get the Bot All Menu.*
*╎*
*╎🏷️Cᴍᴅ -  .alive*
*╎🔖 Dᴇꜱᴄ-  Check Bot Online or Offline.*
*╎*
*╎🏷️Cᴍᴅ -  .about*
*╎🔖 Dᴇꜱᴄ-  Get SUHAS-MD Owner Info.*
*╎*
*╎🏷️Cᴍᴅ -  .runtime/.uptime*
*╎🔖 Dᴇꜱᴄ-  Get Bot Runing Time.*
*╎*
*╎🏷️Cᴍᴅ -  .owner*
*╎🔖 Dᴇꜱᴄ-  Get SUHAS-MD Owner.*
*╎*
*╎🏷️Cᴍᴅ -  .ping*
*╎🔖 Dᴇꜱᴄ-  Check Bot Speed.*
*╎*
*╎🏷️Cᴍᴅ -  .repo*
*╎🔖 Dᴇꜱᴄ-  Get Bot Github Repository.*
*╎*
*╎🏷️Cᴍᴅ -  .suhasbro*
*╎🔖 Dᴇꜱᴄ-  Get Suhas Bro Channel.*
*╎*
*╎🏷️Cᴍᴅ -  .support*
*╎🔖 Dᴇꜱᴄ-  SUHAS-MD Support Group.*
*╎*
*╎🏷️Cᴍᴅ -  .system/.botinfo/.status*
*╎🔖 Dᴇꜱᴄ-  Get the Bot System Details.*
*╎*
*╎🏷️Cᴍᴅ -  .gpass/.googlepw*
*╎🔖 Dᴇꜱᴄ-  Generate a Strong Password.*
*╎*
*╎🏷️Cᴍᴅ -  .cal/.calculator*
*╎🔖 Dᴇꜱᴄ-  Simple Math Tool.*
*╎*
*╎🏷️Cᴍᴅ -  .reverse*
*╎🔖 Dᴇꜱᴄ-  Reversed the Text.*
*╎*
*╎🏷️Cᴍᴅ -  .tempmail*
*╎🔖 Dᴇꜱᴄ-  Get the Temporary Mail.*
*╎*
*╎🏷️Cᴍᴅ -  .checkmail*
*╎🔖 Dᴇꜱᴄ-  Check the Temporary Mail.*
*╎*
*╎🏷️Cᴍᴅ -  .delmail*
*╎🔖 Dᴇꜱᴄ-  Delete the Temporary Mail.*
*╎*
*╎🏷️Cᴍᴅ -  .encode*
*╎🔖 Dᴇꜱᴄ-  Encode the Text.*
*╎*
*╎🏷️Cᴍᴅ -  .decode*
*╎🔖 Dᴇꜱᴄ-  Decode the Text.*
*╎*
*╰───────────────────◦•◦❥•*


*╭─ 乂 👥 ＧＲＯＵＰ 👥 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .remove*
*╎🔖 Dᴇꜱᴄ-  Removed the Member.*
*╎*
*╎🏷️Cᴍᴅ -  .add*
*╎🔖 Dᴇꜱᴄ-  Add the New Member*
*╎*
*╎🏷️Cᴍᴅ -  .del/.delete*
*╎🔖 Dᴇꜱᴄ-  Deleted the Message.*
*╎*
*╎🏷️Cᴍᴅ -  .kick*
*╎🔖 Dᴇꜱᴄ-  Kick the Member.*
*╎*
*╎🏷️Cᴍᴅ -  .setgoodbye*
*╎🔖 Dᴇꜱᴄ-  Add Your Bye Message.*
*╎*
*╎🏷️Cᴍᴅ -  .setwelcome*
*╎🔖 Dᴇꜱᴄ-  Add Your Welcome Message.*
*╎*
*╎🏷️Cᴍᴅ -  .promote*
*╎🔖 Dᴇꜱᴄ-  Give the Addmin in Group*
*╎*
*╎🏷️Cᴍᴅ -  .demote*
*╎🔖 Dᴇꜱᴄ-  Dismissed The Addmin.*
*╎*
*╎🏷️Cᴍᴅ -  .getpic*
*╎🔖 Dᴇꜱᴄ-  Get the Group Image.*
*╎*
*╎🏷️Cᴍᴅ -  .link*
*╎🔖 Dᴇꜱᴄ-  Get the Group Link.*
*╎*
*╎🏷️Cᴍᴅ -  .join*
*╎🔖 Dᴇꜱᴄ-  Joined the Group.*
*╎*
*╎🏷️Cᴍᴅ -  .left*
*╎🔖 Dᴇꜱᴄ-  Leaved the Group.*
*╎*
*╎🏷️Cᴍᴅ -  .kickall*
*╎🔖 Dᴇꜱᴄ-  Kicked the Group Members.*
*╎*
*╎🏷️Cᴍᴅ -  .endgroup*
*╎🔖 Dᴇꜱᴄ-  End the Group.*
*╰───────────────────◦•◦❥•*

*╭─ 乂 👨‍💻 ＯＷＮＥＲ 👨‍💻 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .restart*
*╎🔖 Dᴇꜱᴄ-  Restart the SUHAS-MD.*
*╎*
*╎🏷️Cᴍᴅ -  .msginfo*
*╎🔖 Dᴇꜱᴄ-  Get the Message Details.*
*╎*
*╎🏷️Cᴍᴅ -  .setautobio*
*╎🔖 Dᴇꜱᴄ-  Update Your Bio.*
*╎*
*╎🏷️Cᴍᴅ -  .mute*
*╎🔖 Dᴇꜱᴄ-  Mute the Group.*
*╎*
*╎🏷️Cᴍᴅ -  .unmute*
*╎🔖 Dᴇꜱᴄ-  Unmute the Group.*
*╎*
*╎🏷️Cᴍᴅ -  .shutdown*
*╎🔖 Dᴇꜱᴄ-  Shutdown the SUHAS-MD.*
*╎*
*╎🏷️Cᴍᴅ -  .block*
*╎🔖 Dᴇꜱᴄ-  Blocked the User.*
*╎*
*╎🏷️Cᴍᴅ -  .unblock*
*╎🔖 Dᴇꜱᴄ-  Unblocked the User.*
*╎*
*╎🏷️Cᴍᴅ -  .clearchats*
*╎🔖 Dᴇꜱᴄ-  Cleared the Chat.*
*╎*
*╎🏷️Cᴍᴅ -  .jid*
*╎🔖 Dᴇꜱᴄ-  Get the User Jid.*
*╎*
*╎🏷️Cᴍᴅ -  .gjid*
*╎🔖 Dᴇꜱᴄ-  Get the Group Jid.*
*╎*
*╎🏷️Cᴍᴅ -  .newjid/.sjid*
*╎🔖 Dᴇꜱᴄ-  Shere the Message Using Jid.*
*╎*
*╰───────────────────◦•◦❥•*

*╭─ 乂 🔎 S E A R C H 🔍 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .yts/.ytserach*
*╎🔖 Dᴇꜱᴄ-  Searched the YouTube List.*
*╎*
*╎🏷️Cᴍᴅ -  .lyric/.lyrics*
*╎🔖 Dᴇꜱᴄ-  Searched the Song Lyrics.*
*╎*
*╎🏷️Cᴍᴅ -  .ttinfo/.tiktokinfo*
*╎🔖 Dᴇꜱᴄ-  Searched the TikTok User Info.*
*╎*
*╎🏷️Cᴍᴅ -  .img/.image*
*╎🔖 Dᴇꜱᴄ-  Searched the Google Images.*
*╎*
*╎*
*╎🏷️Cᴍᴅ -  .pronhub/.phub*
*╎🔖 Dᴇꜱᴄ-  Download PronHub Videos in www.pronhub.com.*
*╎*
*╎🏷️Cᴍᴅ -  .xvsearch/.xvs*
*╎🔖 Dᴇꜱᴄ-  Search the Link in www.xvideos.com*
*╎*
*╎🏷️Cᴍᴅ -  .xnxxs*
*╎🔖 Dᴇꜱᴄ-  Searched the Link in www.xnxx.com*
*╎*
*╎🏷️Cᴍᴅ -  .define*
*╎🔖 Dᴇꜱᴄ-  Searched the Random Define.*
*╎*
*╎🏷️Cᴍᴅ -  .githubstalk*
*╎🔖 Dᴇꜱᴄ-  Searched the Github User Info.*
*╎*
*╎🏷️Cᴍᴅ -  .npmstalk/.npm*
*╎🔖 Dᴇꜱᴄ-  Searched the Npm Info.*
*╎*
*╎🏷️Cᴍᴅ -  .instastalk*
*╎🔖 Dᴇꜱᴄ-  Searched the Insta User Info.*
*╎*
*╎🏷️Cᴍᴅ -  .iplookup/.ipinfo*
*╎🔖 Dᴇꜱᴄ-  Searched the IP Info.*
*╎*
*╎🏷️Cᴍᴅ -  .wallpaper*
*╎🔖 Dᴇꜱᴄ-  Searched the Random Wallpapers*
*╎*
*╰───────────────────◦•◦❥•*


*╭─ 乂 🧚‍♂️ R A N D O M 🧚‍♂️ ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .dog/.puppy*
*╎🔖 Dᴇꜱᴄ-  Fetch Random Dog Images.*
*╎*
*╎🏷️Cᴍᴅ -  .suhas*
*╎🔖 Dᴇꜱᴄ-  Fetch 05 Suhas Md Images.*
*╎*
*╎*
*╎🏷️Cᴍᴅ -  .anime*
*╎🔖 Dᴇꜱᴄ-  Fetch 05 Aime Images.*
*╎*
*╎🏷️Cᴍᴅ -  .loli*
*╎🔖 Dᴇꜱᴄ-  Fetch Random Loli Images.*
*╎*
*╎🏷️Cᴍᴅ -  .neko*
*╎🔖 Dᴇꜱᴄ-  Fetch Random Neko Images.*
*╎*
*╎🏷️Cᴍᴅ -  .maid*
*╎🔖 Dᴇꜱᴄ-  Fetch Random Maid Images.*
*╎*
*╎🏷️Cᴍᴅ -  .cringe*
*╎🔖 Dᴇꜱᴄ-  Fetch Random cringe Images.*
*╎*
*╎🏷️Cᴍᴅ -  .smug*
*╎🔖 Dᴇꜱᴄ-  Fetch Random smug Images.*
*╎*
*╎🏷️Cᴍᴅ -  .dance*
*╎🔖 Dᴇꜱᴄ-  Fetch Random dance Images.*
*╎*
*╎🏷️Cᴍᴅ -  .poke*
*╎🔖 Dᴇꜱᴄ-  Fetch Random poke Images.*
*╎*
*╎🏷️Cᴍᴅ -  .wink*
*╎🔖 Dᴇꜱᴄ-  Fetch Random wink Images.*
*╎*
*╎🏷️Cᴍᴅ -  .happy*
*╎🔖 Dᴇꜱᴄ-  Fetch Random happy Images.*
*╎*
*╎🏷️Cᴍᴅ -  .kick*
*╎🔖 Dᴇꜱᴄ-  Fetch Random kick Images.*
*╎*
*╎🏷️Cᴍᴅ -  .kill*
*╎🔖 Dᴇꜱᴄ-  Fetch Random kill Images.*
*╎*
*╎🏷️Cᴍᴅ -  .glomp*
*╎🔖 Dᴇꜱᴄ-  Fetch Random glomp Images.*
*╎*
*╎🏷️Cᴍᴅ -  .slap*
*╎🔖 Dᴇꜱᴄ-  Fetch Random slap Images.*
*╎*
*╎🏷️Cᴍᴅ -  .bite*
*╎🔖 Dᴇꜱᴄ-  Fetch Random bite Images.*
*╎*
*╎🏷️Cᴍᴅ -  .nom*
*╎🔖 Dᴇꜱᴄ-  Fetch Random nom Images.*
*╎*
*╎🏷️Cᴍᴅ -  .wave*
*╎🔖 Dᴇꜱᴄ-  Fetch Random wave Images.*
*╎*
*╎🏷️Cᴍᴅ -  .smile*
*╎🔖 Dᴇꜱᴄ-  Fetch Random smile Images.*
*╎*
*╎🏷️Cᴍᴅ -  .yeet*
*╎🔖 Dᴇꜱᴄ-  Fetch yeet dance Images.*
*╎*
*╎🏷️Cᴍᴅ -  .bonk*
*╎🔖 Dᴇꜱᴄ-  Fetch Random bonk Images.*
*╎*
*╎🏷️Cᴍᴅ -  .pat*
*╎🔖 Dᴇꜱᴄ-  Fetch Random pat Images.*
*╎*
*╎🏷️Cᴍᴅ -  .lick*
*╎🔖 Dᴇꜱᴄ-  Fetch Random lick Images.*
*╎*
*╎🏷️Cᴍᴅ -  .kiss*
*╎🔖 Dᴇꜱᴄ-  Fetch Random kiss Images.*
*╎*
*╎🏷️Cᴍᴅ -  .hug*
*╎🔖 Dᴇꜱᴄ-  Fetch Random hug Images.*
*╎*
*╎🏷️Cᴍᴅ -  .cry*
*╎🔖 Dᴇꜱᴄ-  Fetch Random cry Images.*
*╎*
*╎🏷️Cᴍᴅ -  .cuddle*
*╎🔖 Dᴇꜱᴄ-  Fetch Random cuddle Images.*
*╎*
*╎🏷️Cᴍᴅ -  .bully*
*╎🔖 Dᴇꜱᴄ-  Fetch Random dance Images.*
*╎*
*╎🏷️Cᴍᴅ -  .megumin*
*╎🔖 Dᴇꜱᴄ-  Fetch Random megumin Images.*
*╎*
*╎🏷️Cᴍᴅ -  .shinobu*
*╎🔖 Dᴇꜱᴄ-  Fetch Random shinobu Images.*
*╎*
*╎🏷️Cᴍᴅ -  .animegirl/.animegirl1*
*╎🔖 Dᴇꜱᴄ-  Fetch Random Girl Images.*
*╎*
*╎🏷️Cᴍᴅ -  .animegirl2/.animegirl3*
*╎🔖 Dᴇꜱᴄ-  Fetch Random Grirl Images.*
*╎*
*╰───────────────────◦•◦❥•*


*╭─ 乂 🎡ＣＯＮＶＥＲＴＥＲ 🎡 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .s/.stic/.sticker*
*╎🔖 Dᴇꜱᴄ-  Convert a Image the Sticker.*
*╎*
*╎🏷️Cᴍᴅ -  .tts/.texttovoice*
*╎🔖 Dᴇꜱᴄ-  Convert a Text To Ai Sound.*
*╎*
*╎🏷️Cᴍᴅ -  .textstyle*
*╎🔖 Dᴇꜱᴄ-  Create a Fancy Texts.*
*╎*
*╎🏷️Cᴍᴅ -  .fancy/.fancytext*
*╎🔖 Dᴇꜱᴄ-  Create a Fancy Texts.*
*╎*
*╎🏷️Cᴍᴅ -  .ss/.screenshot*
*╎🔖 Dᴇꜱᴄ-  Get the ScreenShots in Web.*
*╎*
*╎🏷️Cᴍᴅ -  .img2url/.imgtourl*
*╎🔖 Dᴇꜱᴄ-  Convert Image to Link.*
*╎*
*╎🏷️Cᴍᴅ -  .trt*
*╎🔖 Dᴇꜱᴄ-  Translate Text Any Language.*
*╎*
*╎🏷️Cᴍᴅ -  .convert*
*╎🔖 Dᴇꜱᴄ-  Covert Tool.*
*╎*
*╎🏷️Cᴍᴅ -  .currency*
*╎🔖 Dᴇꜱᴄ-  Covert Currency to Amount.*
*╎*
*╎🏷️Cᴍᴅ -  .img2url/.imgtourl*
*╎🔖 Dᴇꜱᴄ-  Convert Image to Link.*
*╎*
*╎🏷️Cᴍᴅ -  .qcode/.qrcode*
*╎🔖 Dᴇꜱᴄ-  Convert Text to Qrcode.*
*╎*
*╎🏷️Cᴍᴅ -  .bcode/.barcode*
*╎🔖 Dᴇꜱᴄ-  Convert Text to Barcode.*
*╎*
*╰───────────────────◦•◦❥•*


*╭─ 乂 📥 D O W N L O A D 📥 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .song/.play*
*╎🔖 Dᴇꜱᴄ-  Download Any Song.*
*╎*
*╎🏷️Cᴍᴅ -  .video/.ytmp4*
*╎🔖 Dᴇꜱᴄ-  Download Any Videos.*
*╎*
*╎🏷️Cᴍᴅ -  .fb/.facebook*
*╎🔖 Dᴇꜱᴄ-  Download FaceBook Videos.*
*╎*
*╎🏷️Cᴍᴅ -  .tt/.tiktok*
*╎🔖 Dᴇꜱᴄ-  Download TikTok Videos.*
*╎*
*╎🏷️Cᴍᴅ -  .img/.image*
*╎🔖 Dᴇꜱᴄ-  Download Google Images.*
*╎*
*╎🏷️Cᴍᴅ -  .apk/.dlapk/.apkdl*
*╎🔖 Dᴇꜱᴄ-  Download Any Apk.*
*╎*
*╎🏷️Cᴍᴅ -  .pronhub/.phub*
*╎🔖 Dᴇꜱᴄ-  Download PronHub Videos in www.pronhub.com.*
*╎*
*╎🏷️Cᴍᴅ -  .xvideo*
*╎🔖 Dᴇꜱᴄ-  Download Pronhub Videos in www.xvideos.com.*
*╎*
*╎🏷️Cᴍᴅ -  .dlxvideo/.xvideodl*
*╎🔖 Dᴇꜱᴄ-  Download Xvideos in www.xvideos2.com.*
*╎*
*╎🏷️Cᴍᴅ -  .xnxxdown*
*╎🔖 Dᴇꜱᴄ-  Download Xnxx Videos in www.xnxx.com.*
*╎*
*╎🏷️Cᴍᴅ -  .dlxnxx/.xnxxdl*
*╎🔖 Dᴇꜱᴄ-  Download Xnxx Videos in www.xnxx2.com.*
*╎*
*╎🏷️Cᴍᴅ -  .mediafire*
*╎🔖 Dᴇꜱᴄ-  Download Mediafire Files.*
*╎*
*╎🏷️Cᴍᴅ -  .gdrive*
*╎🔖 Dᴇꜱᴄ-  Download Gdrive Files.*
*╎*
*╎🏷️Cᴍᴅ -  .twitter/.x*
*╎🔖 Dᴇꜱᴄ-  Download Twitter/X Videos*
*╎*
*╎🏷️Cᴍᴅ -  .logo*
*╎🔖 Dᴇꜱᴄ-  Create 20+ Logos.*
*╎*
*╰───────────────────◦•◦❥•*

*╭─ 乂 🍿 M O V I E S 🍿 ── ◦•◦❥•*
*╎*
*╎🏷️Cᴍᴅ -  .movie*
*╎🔖 Dᴇꜱᴄ-  Get Any Movie Details.*
*╎*
*╎🏷️Cᴍᴅ -  .sinhalasublk*
*╎🔖 Dᴇꜱᴄ-  Get SinhalaSub Movie Details in www.sinhalasub.lk.*
*╎*
*╎🏷️Cᴍᴅ -  .sinhalasubdl*
*╎🔖 Dᴇꜱᴄ-  Download Movies in www.sinhalasub.lk.*
*╎*
*╎🏷️Cᴍᴅ -  .cineinfo*
*╎🔖 Dᴇꜱᴄ-  Download Movies in www.cinesub.lk.*
*╎*
*╎🏷️Cᴍᴅ -  .Ginisisila*
*╎🔖 Dᴇꜱᴄ-  Download Movies in www.ginisisila.lk.*
*╎*
*╎🏷️Cᴍᴅ -  .ytxms*
*╎🔖 Dᴇꜱᴄ-  Download Ytmxs Movies.*
*╎*
*╎🏷️Cᴍᴅ -  .sinhalasubshere*
*╎🔖 Dᴇꜱᴄ-  Shere Sinhalasub Movies Using Jid.*
*╎*
*╎🏷️Cᴍᴅ -  .cineshere*
*╎🔖 Dᴇꜱᴄ-  Shere CineSubz Movies Using Jid.*
*╎*
*╎🏷️Cᴍᴅ -  .baiscope*
*╎🔖 Dᴇꜱᴄ-  Download Movies in www.baiscope.com.*
*╎*
*╰───────────────────◦•◦❥•*


🎉Sᴜʜᴀꜱ Mᴅ Bᴏᴛ Dᴇᴘʟᴏʏ Vɪᴅᴇᴏ.
https://youtu.be/k0Jwrx1j5v4?si=Yy74MV41TvXVErsz


> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
`
                    await conn.sendMessage(from, {
            image: { url: `https://i.ibb.co/HFC0QL8/20250126-101314.jpg`}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: list,
                        contextInfo: {
                mentionedJid: ['94774132871@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363371157309766@newsletter',
                    newsletterName: "✨S𝚄𝙷𝙰𝚂-M𝙳💗",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: '✨ 𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 💕',
                    body: '𝕊𝕦𝕙𝕒𝕤 ℙ𝕒𝕥𝕙𝕤𝕚𝕟𝕕𝕦',
                    mediaType: 1,
                    sourceUrl: "https://github.com/SUHAS-BRO/SUHAS-MD",
                    thumbnailUrl: 'https://i.ibb.co/HFC0QL8/20250126-101314.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
                }
            }})
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})


//alive is end

//topdf in this


cmd({
    pattern: "topdf",
    alias: "pdf",
    desc: "Convert provided text to a PDF file.",
    react: "📄",
    category: "utilities",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide the text you want to convert to PDF. *Eg* `.topdf` *SUHAS-MD is The Best 🥰*");

        // Create a new PDF document
        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(buffers);

            // Send the PDF file
            await conn.sendMessage(from, {
                document: pdfData,
                mimetype: 'application/pdf',
                fileName: 'SUHAS-MD.pdf',
                caption: `
*📄 PDF Created Successully!*

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`
            }, { quoted: mek });
        });

        // Add text to the PDF
        doc.text(q);

        // Finalize the PDF and end the stream
        doc.end();

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
