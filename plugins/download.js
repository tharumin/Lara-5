const { fetchJson } = require('../lib/functions')
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const getFBInfo = require("@xaviabot/fb-downloader");
const cheerio = require('cheerio')
const config = require('../config')
const { igdl } = require('ruhend-scraper')
const axios = require('axios');
const { cmd, commands } = require('../command')
const fetch = require('node-fetch'); // Ensure fetch is imported



cmd({
    pattern: "tiktok",
    alias: ["tt"],
    react: "🎥",
    desc: "Download tt videos",
    category: "download",
    use: ".tiktok <link>",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me tiktok url ❌*")
        m.react('⬇️')
        //fetch data from api  
        let data = await downloadTiktok(q);
     let desc = `
   *SUHAS-MD TIKTOK DOWNLOADER* ⬇️

🔢 *Reply The Below Number:*

◈Title * ${data.result.title}

*TikTok Video.🎥*

*1 | SD Qulity.*
*2 | HD Qulity.*

*Tiktok Audio.🎶*

*3 | Audio File.*
   
*◈ URL:* ${q}
   
> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*       
     `

const sentMsg = await conn.sendMessage(from, {
  image: { url: data.result.image}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: desc,
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
          renderLargerThumbnail: true,
          showAdAttribution: false
      }
  }
});
const messageID = sentMsg.key.id; // Save the message ID for later reference


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
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        let dat = data.result;

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1') {
            // Handle option 1 (no wm File)
            await conn.sendMessage(from, {
              video: { url: dat.dl_link.download_mp4_1}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
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
                      renderLargerThumbnail: true,
                      showAdAttribution: false
                  }
              }
            });
            }
         else if (messageType === '2') {
            // Handle option 2 (wm File)
            await conn.sendMessage(from, {
              video: { url: dat.dl_link.download_mp4_2}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
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
                      renderLargerThumbnail: true,
                      showAdAttribution: false
                  }
              }
            }); }
           
          else if (messageType === '3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: dat.dl_link.download_mp3 }, mimetype: "audio/mpeg" }, { quoted: mek })  
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});


// Facebook Downloader
cmd({
  pattern: "facebook",
  alias: ["fb"],
  desc: "Download Facebook videos",
  category: "download",
  use: ".facebook <link>",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {

  if (!q || !q.startsWith("https://")) {
    return conn.sendMessage(from, { text: "Please provide a valid URL.⁉️" }, { quoted: mek });
}

await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

const result = await getFBInfo(q);

    const captionHeader = `
*SUHAS-MD FB DOWNLOADER.⬇️*

◈ Title: ${result.title}

🔢 *Reply The Below Number:*


*Facebook Video.🎥*

*1.1 | SD Qulity.*
*1.2 | HD Qulity.*


*Facebook Audio.🎶*

*2.1 | Audio File*
*2.2 | Document File*
*2.3 | Voice Cut*

◈ Url: ${q} 

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
`;

const sentMsg = await conn.sendMessage(from, {
  image: { url: result.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: captionHeader,
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
          renderLargerThumbnail: true,
          showAdAttribution: false
      }
  }
});
const messageID = sentMsg.key.id; // Save the message ID for later reference


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
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        
        

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1.1') {
            // Handle option 1 (sd File)
            await conn.sendMessage(from, {
              video: { url: result.sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
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
                      renderLargerThumbnail: true,
                      showAdAttribution: false
                  }
              }
            });
          }

          else if (messageType === '1.2') {
            // Handle option 2 (hd File)
            await conn.sendMessage(from, {
              video: { url: result.hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
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
                      renderLargerThumbnail: true,
                      showAdAttribution: false
                  }
              }
            });
          }
           
          else if (messageType === '2.1') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: "audio/mpeg" }, { quoted: mek })
          }
          
          else if (messageType === '2.2') {
            await conn.sendMessage(from, {
              document: { url: result.sd },
              mimetype: "audio/mpeg",
              fileName: `SUHAS-MD/FBDL.mp3`,
              caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
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
                    renderLargerThumbnail: true,
                    showAdAttribution: false
                }
            }
          }, { quoted: mek });
          }
          
          else if (messageType === '2.3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
  });
} catch (e) {
console.log(e);
reply(`${e}`);
}
})

cmd({
    pattern: "twitter",
    alias: ["tweet1", "twdl"],
    desc: "Download Twitter videos",
    category: "download",
    use: ".teitter1 <link>",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: mek });
    }

    // React to indicate processing start
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    // Fetch video information from Dark Yasiya Twitter API
    const twitterData = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = twitterData.data;

    if (!data || !data.status || !data.result) {
      return m.reply("Failed to retrieve Twitter video. Please check the link and try again.");
    }

    const { desc, thumb, video_sd, video_hd } = data.result;
    const captionHeader = `
🪄 SUHAS-MD TWITTER DOWNLOADER 🪄

📝 Description: ${desc || "No description"}

🔢 *Reply The Below Number:* 

*Twitter Video.🎥*

*1.1 | SD Qulity.*
*1.2 | HD Qulity.*

*Twitter Audio.🎶*

*2.1 | Audio File*
*2.2 | Document File*
*2.3 | Voice Cut* 

◈ URL: ${q}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: thumb}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
      caption: captionHeader,
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
              renderLargerThumbnail: true,
              showAdAttribution: false
          }
      }
    });
    const messageID = sentMsg.key.id;

    // Listen for the user's response
    conn.ev.on('messages.upsert', async (messageUpdate) => {
      const mek = messageUpdate.messages[0];
      if (!mek.message) return;
      const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
      const from = mek.key.remoteJid;

      // Check if the message is a reply to the previously sent message
      const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

      if (isReplyToSentMsg) {
        // React to the user's selection
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        if (messageType === '1.1') {
          // Send SD video
          await conn.sendMessage(from, {
            video: { url: video_sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
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
                    renderLargerThumbnail: true,
                    showAdAttribution: false
                }
            }
          });
        } else if (messageType === '1.2') {
          // Send HD video
          await conn.sendMessage(from, {
            video: { url: video_hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
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
                    renderLargerThumbnail: true,
                    showAdAttribution: false
                }
            }
          });
        } else if (messageType === '2.1') {
          // Send audio as an audio file
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (messageType === '2.2') {
          // Send audio as a document file
          await conn.sendMessage(from, {
            document: { url: video_sd },
            mimetype: "audio/mpeg",
            fileName: `SUHAS-MD/Twitter.mp3`,
            caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
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
                    renderLargerThumbnail: true,
                    showAdAttribution: false
                }
            }
          }, { quoted: mek });
        } else if (messageType === '2.3') {
          // Send audio as a voice note (ptt)
          await conn.sendMessage(from, { audio: { url: video_sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
        }

        // React to completion
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Twitter response sent successfully");
      }
    });
  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e}`);
  }
});




cmd({
    pattern: "mediafire1",
    alias: ["mfire1"],
    desc: "To download MediaFire files.",
    react: "⬇️",
    category: "download",
    use: ".mediafire <link>",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return m.reply("Please provide a valid MediaFire link.❗");
        
        // React to indicate download start
        m.react('⬇️');
        
        // Fetch file information from the Dark Yasiya API
        const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
        const resData = response.data;

        if (!resData || !resData.status || !resData.result || !resData.result.dl_link) {
            return m.reply("Failed to fetch MediaFire download link. Ensure the link is valid and public.");
        }

        const fileUrl = resData.result.dl_link;
        const fileName = resData.result.fileName || "mediafire_download";
        const fileType = resData.result.fileType || "application/octet-stream";
        
        // React to indicate file is being sent
        m.react('⬆️');

        let msg = `
        *SUHAS-MD MEDIAFIRE DOWNLODER.⬇️*

◈File Name : ${fileName}
◈ File Type : ${fileType}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
        `

        // Send file to chat without downloading
        await conn.sendMessage(from, {
          document: { url: fileUrl},
          mimetype: fileType,
          fileName: fileName, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
          caption: msg,
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
                  renderLargerThumbnail: true,
                  showAdAttribution: false
              }
          }
        });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});


cmd({

  pattern: "instagram1",
  desc: "To download instagram videos.",
  react: "🎥",
  category: "download",
  use: ".instagram <link>",
  filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
  
if (!q) return m.reply(`Please Give Me a Vaild Link...⁉️`);
m.react('⬇️')

       let res = await igdl(q);
      
       let data = await res.data;
       for (let i = 0; i < 20; i++) {
          let media = data[i];
          let downloadurl = media.url
           m.react('⬆️')
          await conn.sendMessage(from,{
            video: {url:downloadurl},
            mimetype:"video/mp4",
            caption: `> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`,
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
                    renderLargerThumbnail: true,
                    showAdAttribution: false
                }
            }},{quoted:mek})
           m.react('✅')
       }

}catch(e){
console.log(e)
}
})



async function xdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: true, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({status: false, result: err}));
  });
}

cmd({
    pattern: "xnxxdown",
    alias: ["dlxnxx","xnxxdl"],
    react: '🔞',
    desc: "Download xnxx videos",
    category: "download",
    use: '.xnxxdl <xnxx link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
 if (!q) return reply('*Please give me Url.❗❗*')
  let res = await xdl(q)
  let title = res.result.title
  await conn.sendMessage(from, { 
    video: { url: res.result.files.high },
     caption: title,
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
            renderLargerThumbnail: true,
            showAdAttribution: false
        }
    }}, { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
  pattern: "xvdown",
  alias: ["dlxv","xvdl"],
  react: '🔞',
  desc: "Download xvideos videos",
  category: "download",
  use: '.xvdl <xvideos link>',
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{      
//if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
if (!q) return reply('*Please give me Url.❗❗*')


let xv_info = await fetchJson(`https://www.dark-yasiya-api.site/download/xvideo?url=${q}`)
const msg = `
*SUHAS-MD XVIDEO DOWNLOADER* 🔞

◈ *Title* - ${xv_info.result.title}
◈ *Views* - ${xv_info.result.views}
◈ *Like* - ${xv_info.result.like}
◈ *Deslike* - ${xv_info.result.deslike}
◈ *Size* - ${xv_info.result.size}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`



await conn.sendMessage(from, {
  video: { url: xv_info.result.dl_link}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: msg,
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
          renderLargerThumbnail: true,
          showAdAttribution: false
      }
  }
});
// SEND VIDEO

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})


const fs = require('fs');
const path = require('path');


// Command handler for searching Avatar episodes
cmd({
    pattern: "baiscope",
    react: '📑',
    category: "movie",
    desc: "Download movies in baiscope.lk",
    use: ".baiscope <name>",
    filename: __filename
}, async (conn, m, mek, { from, q, isDev, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g:- Sonic 3)*');

        // Construct the search URL
        const searchUrl = `https://www.baiscope.lk/?s=${encodeURIComponent(q)}`;
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        let episodes = [];

        // Scrape episode details (title, link, and image)
        $("article.elementor-post").each((index, element) => {
            const title = $(element).find("h5.elementor-post__title > a").text().trim();
            const episodeLink = $(element).find("h5.elementor-post__title > a").attr("href");
            const imgUrl = $(element).find(".elementor-post__thumbnail img").attr("src");

            if (title && episodeLink && imgUrl) {
                episodes.push({
                    title,
                    episodeLink,
                    imgUrl
                });
            }
        });

        // If no episodes found
        if (episodes.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        // Prepare message info
        let info = `🎰 Search Results for *${q}:*\n\n`;
        episodes.forEach((ep, index) => {
            info += `*${index + 1}.* ${ep.title}\n◈ Link: ${ep.episodeLink}\n\n`;
        });

        // Send the compiled information
        const sentMsg = await conn.sendMessage(from,
            { text: info,
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
                        renderLargerThumbnail: true,
                        showAdAttribution: false
                    }
                }
             }, { quoted: mek });
        const messageID = sentMsg.key.id; // Save the message ID for later reference

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= episodes.length) {
                    const selectedEpisode = episodes[selectedNumber - 1];

                    // Fetch the download link from the selected episode page
                    const episodeResponse = await axios.get(selectedEpisode.episodeLink);
                    const $episodePage = cheerio.load(episodeResponse.data);
                    const downloadLink = $episodePage("a.dlm-buttons-button").attr("href");

                    if (downloadLink) {
                        // Send the image of the selected episode along with the details
                        await conn.sendMessage(from, {
                            image: { url: selectedEpisode.imgUrl },
                            caption: `📽️ *${selectedEpisode.title}*\n◈ Link: ${selectedEpisode.episodeLink}\n⬇️ Download Will Follow.`,
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
                                    renderLargerThumbnail: true,
                                    showAdAttribution: false
                                }
                            }
                        }, { quoted: mek });

                        // Download the ZIP file
                        const zipFilePath = path.join(__dirname, 'downloaded_episode.zip');
                        const writer = fs.createWriteStream(zipFilePath);

                        const downloadResponse = await axios({
                            url: downloadLink,
                            method: 'GET',
                            responseType: 'stream'
                        });
downloadResponse.data.pipe(writer);

                        writer.on('finish', async () => {
                            // Once the download is complete, send the ZIP file to the user
                            await conn.sendMessage(from, {
                                document: { url: zipFilePath },
                                mimetype: 'application/zip',
                                fileName: `${selectedEpisode.title}.zip`,
                                caption: `*${selectedEpisode.title}*\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`,
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

                            // Optionally delete the downloaded ZIP file after sending
                            fs.unlinkSync(zipFilePath);
                        });

                        writer.on('error', (err) => {
                            console.error('Error downloading ZIP file:', err);
                            reply('*Error downloading the episode ZIP file.*');
                        });

                    } else {
                        await reply('*Download link not found for the selected episode.*');
                    }
                } else {
                    await reply('*Invalid selection. Please choose a valid number.*');
                }
            }
        });

    } catch (error) {
        console.error(error);
        await reply(`${error}`);
    }
});

// Command handler for searching cartoons
cmd({
    pattern: "ginisisila",
    react: '📑',
    category: "movie",
    desc: "Download Cartoons in ginisisilacartoon.net",
    use: ".ginisisila <name>",
    filename: __filename
}, async (conn, m, mek, { from, q, isDev, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Garfield)*');

        // Construct the search URL
        const searchUrl = `https://ginisisilacartoon.net/search.php?q=${encodeURIComponent(q)}`;
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        let episodes = [];

        // Scrape episode details
        $("div.inner-video-cell").each((index, element) => {
            const title = $(element).find("div.video-title > a").attr("title");
            const postedTime = $(element).find("div.posted-time").text().trim();
            const episodeLink = $(element).find("div.video-title > a").attr("href");
            const imageUrl = $(element).find("div.inner-video-thumb-wrapper img").attr("src"); // Get episode image URL

            if (title && episodeLink) {
                episodes.push({
                    title,
                    postedTime,
                    episodeLink: `https://ginisisilacartoon.net/${episodeLink}`,
                    imageUrl: imageUrl
                });
            }
        });

        // If no episodes found
        if (episodes.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        // Prepare message info
        let info = `🪩 Search Results for *${q}:*\n\n`;
        episodes.forEach((ep, index) => {
            info += `*${index + 1}.* ${ep.title}\n◈ Posted: ${ep.postedTime}\n🛡️ Link: ${ep.episodeLink}\n\n`;
        });

        // Send the compiled information
        const sentMsg = await conn.sendMessage(from,{ text: info ,
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
        const messageID = sentMsg.key.id; // Save the message ID for later reference

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
// Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= episodes.length) {
                    const selectedEpisode = episodes[selectedNumber - 1];

                    // Send episode details with image first
                    const episodeInfo = `*◈ Name:* ${selectedEpisode.title}\n*◈ Date:* ${selectedEpisode.postedTime}\n*◈ Link: ${selectedEpisode.episodeLink}\n\n☺ *𝚆𝚎 𝚊𝚛𝚎 𝚞𝚙𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝚝𝚑𝚎 𝙼𝚘𝚟𝚒𝚎/𝙴𝚙𝚒𝚜𝚘𝚍𝚎 𝚢𝚘𝚞 𝚛𝚎𝚚𝚞𝚎𝚜𝚝𝚎𝚍.*`;
                    const imageMessage = {
                        image: { url: selectedEpisode.imageUrl },
                        caption: episodeInfo,
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
                                renderLargerThumbnail: true,
                                showAdAttribution: false
                            }
                        }
                    };
                    await conn.sendMessage(from, imageMessage, { quoted: mek });

                    // Fetch the episode page to extract the video link (iframe src)
                    const episodePageResponse = await axios.get(selectedEpisode.episodeLink);
                    const $ = cheerio.load(episodePageResponse.data);

                    // Extract the IFRAME src link
                    const iframeSrc = $('div#player-holder iframe').attr('src');

                    if (iframeSrc) {
                        // Call the external API to get the download link using the iframe link
                       const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${iframeSrc}&apikey=mnp3grlZ`;

                        try {
                            const downloadResponse = await axios.get(apiUrl);
                            const downloadUrl = downloadResponse.data.result.downloadUrl; // Assuming this is the correct path

                            if (downloadUrl) {
                                // Send the video as a document (.mp4)
                                await conn.sendMessage(from, {
                                    document: { url: downloadUrl },
                                    mimetype: "video/mp4",
                                    fileName: `*✨ 𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 💕 | ${selectedEpisode.title}.mp4`,
                                    caption: `${selectedEpisode.title}\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`,
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
                                            showAdAttribution: false
                                        }
                                    }
                                }, { quoted: mek });
                            } else {
                                await reply('ꜰᴀɪʟᴇᴅ ᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴛʜᴇ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ ꜰᴏʀ ᴛʜɪꜱ ᴇᴘɪꜱᴏᴅᴇ.');
                            }
                        } catch (error) {
                            console.error('ᴇʀʀᴏʀ ꜰᴇᴛᴄʜɪɴɢ ᴛʜᴇ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ:', error);
                            await reply(`${error}`);
                        }

                    } else {
                        await reply('ɴᴏ ᴅᴏᴡɴʟᴏᴀᴅᴀʙʟᴇ ʟɪɴᴋ ꜰᴏᴜɴᴅ ꜰᴏʀ ᴛʜɪꜱ ᴇᴘɪꜱᴏᴅᴇ.');
                    }

                } else {
                    await reply(`ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ᴡɪᴛʜ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ ꜰʀᴏᴍ ᴛʜᴇ ʟɪꜱᴛ.`);
                }
            }
        });

    } catch (e) {
        reply('*Error occurred while scraping!*');
        console.error(e);
    }
});


cmd({
    pattern: "apk1",
    desc: "Download apk.",
    react: "🗂",
    category: "download",
    use: ".apk1 <name>",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {

await m.react("⬇")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*SUHAS-MD APK DOWNLOADER.📥*

*╭──📥 APK Details.📥────◦•❥*
*╎*
*╎* *🏷️ Name :* ${data.datalist.list[0].name}
*╎* *📥 Size :* ${correctsize}MB
*╎* *🔖 Package :* ${data.datalist.list[0].package}
*╎* *📆 Last Update :* ${data.datalist.list[0].updated}
*╎* *👤 Developers :* ${data.datalist.list[0].developer.name}
*╎*
*╰────────────────────◦•❥*

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`
await m.react("⬆")
await conn.sendMessage(from,{
    document: {url: data.datalist.list[0].file.path_alt},
    fileName: data.datalist.list[0].name,
    mimetype: 'application/vnd.android.package-archive',
    caption: desc,
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
            renderLargerThumbnail: true,
            showAdAttribution: false
        }
    }},{quoted: mek})
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})

const { sinhalaSub } = require('mrnima-moviedl'); // Make sure mrnima-moviedl is installed and supports search

cmd({
    pattern: "sinhalasubz",
    react: '🎥',
    category: "movie",
    desc: "Search movies on sinhalasub.lk and get download links",
    use: ".sinhalasub <name>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply('*Please Provide a Search Name. e.g:- Sonic 3*');
        
        var movie = await sinhalaSub();
        const results = await movie.search(q);
        const searchResults = results.result.slice(0, 10);
        
        if (!searchResults || searchResults.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        let resultsMessage = `📽️ *Search Results For:* "${q}":\n\n`;
        searchResults.forEach((result, index) => {
            resultsMessage += `*${index + 1}.* ${result.title}\n🔗 Link: ${result.link}\n\n`;
        });

        const sentMsg = await conn.sendMessage(from, { text: resultsMessage }, { quoted: mek });
        const messageID = sentMsg.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;
            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= searchResults.length) {
                    const selectedMovie = searchResults[selectedNumber - 1];

                    const apiUrl = `https://api-site-2.vercel.app/api/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;
                    try {
                        const response = await axios.get(apiUrl);
                        const movieData = response.data.result;

                        // Only use `dl_links1` for PixelDrain links
                        const pixelDrainLinks = movieData.dl_links || [];
                        if (pixelDrainLinks.length === 0) {
                            return await reply('No PixelDrain links found.');
                        }

                        let downloadMessage = `🎥 *${movieData.title}*\n\n`;
                        downloadMessage += `*Available PixelDrain Download Links:*\n`;

                        pixelDrainLinks.forEach((link, index) => {
                            downloadMessage += `*${index + 1}.* ${link.quality} - ${link.size}\n🔗 Link: ${link.link}\n\n`;
                        });

                        const pixelDrainMsg = await conn.sendMessage(from, { text: downloadMessage }, { quoted: replyMek });
                        const pixelDrainMessageID = pixelDrainMsg.key.id;

                        conn.ev.on('messages.upsert', async (pdUpdate) => {
                            const pdReply = pdUpdate.messages[0];
                            if (!pdReply.message) return;
                            const pdMessageType = pdReply.message.conversation || pdReply.message.extendedTextMessage?.text;
                            const isReplyToPixelDrainMsg = pdReply.message.extendedTextMessage && pdReply.message.extendedTextMessage.contextInfo.stanzaId === pixelDrainMessageID;

                            if (isReplyToPixelDrainMsg) {
                                const qualityNumber = parseInt(pdMessageType.trim());
                                if (!isNaN(qualityNumber) && qualityNumber > 0 && qualityNumber <= pixelDrainLinks.length) {
                                    const selectedPixelDrainLink = pixelDrainLinks[qualityNumber - 1];
                                    const fileId = selectedPixelDrainLink.link.split('/').pop();
                                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

                                    const directDownloadUrl = `https://pixeldrain.com/api/file/${fileId}`;

                                    await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } });

                                    await conn.sendMessage(from, {
                                        document: { url: directDownloadUrl },
                                        mimetype: "video/mp4",
                                        fileName: `${movieData.title} - ${selectedPixelDrainLink.quality}.mp4`,
                                        caption: `${movieData.title}\nQuality: ${selectedPixelDrainLink.quality}\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`,
                                        contextInfo: {
                                            mentionedJid: [],
                                            externalAdReply: {
                                                title: movieData.title,
                                                body: 'Download powered by SinhalaSub',
                                                mediaType: 1,
                                                sourceUrl: selectedMovie.link,
                                                thumbnailUrl: movieData.image
                                            }
                                        }
                                    }, { quoted: pdReply });

                                    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                                } else {
                                    await reply('Invalid selection. Please reply with a valid number.');
                                }
                            }
                        });

                    } catch (error) {
                        console.error('Error fetching movie details:', error);
                        await reply('An error occurred while fetching movie details. Please try again.');
                    }
                } else {
                    await reply('Invalid selection. Please reply with a valid number.');
                }
            }
        });

    } catch (error) {
        console.error('Error during search:', error);
        reply('*An error occurred while searching!*');
    }
});



cmd({

    pattern: "gdrive",
    desc: "To download Gdrive files.",
    react: "📥",
    category: "download",
    use: ".gdrive <name>",
    filename: __filename
  
  },
  
  async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  
  try{
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
  if (!q) return m.reply(`Please Give Me a vaild Link...`);
  
  const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;

  const downloadResponse = await axios.get(apiUrl);
                            const downloadUrl = downloadResponse.data.result.downloadUrl; // Assuming this is the correct path

                            if (downloadUrl) {
                                // Send the video as a document (.mp4)
                                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                                await conn.sendMessage(from, {
                                    document: { url: downloadUrl },
                                    mimetype: downloadResponse.data.result.mimetype,
                                    fileName: downloadResponse.data.result.fileName,
                                    caption: `> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`,
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
                                            renderLargerThumbnail: true,
                                            showAdAttribution: false
                                        }
                                    }
                                }, { quoted: mek });
                            }
         
                            await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
  }catch(e){
  console.log(e)
  }
  });
  
  // Replace this URL with your actual webpage URL



  cmd({
    pattern: "cinesubz",
    alias: ["cine"],
    react: "🎬",
    desc: "Search and download movies from CineSubz.lk",
    category: "movie",
    use: ".cinesubz <name>",
    filename: __filename,
  }, async (conn, m, mek, { from, q, senderNumber, reply }) => {
    try {
    
      // Validate input query
      if (!q) {
        return await reply(
          "*Please Provided a Movie Name For Search. e.g:- Deadpool*"
        );
      }
  
      // Step 1: Search movies from CineSubz API
      const searchResponse = await fetchJson(
        `https://cinesubz-api-zazie.vercel.app/api/search?q=${encodeURIComponent(q)}`
      );
      const searchData = searchResponse;
  
      if (!searchData.status) {
        return await reply(`*No results found for:* "${q}"`);
      }
  
      const searchResults = searchData.result.data;
      let resultsMessage = `*SUHAS-MD CINESUBZ DOWNLOADER 🎬* \n\n🎥 *Search Results for* "${q}":\n\n`;
  
      searchResults.forEach((result, index) => {
        resultsMessage += `*${index + 1}.* ${result.title} (${result.year})\n🔗 Link: ${result.link}\n\n`;
      });
  
      const sentMsg = await conn.sendMessage(
        from,
        { text: resultsMessage },
        { quoted: mek }
      );
      const messageID = sentMsg.key.id;
  
      // Step 2: Wait for the user to select a movie
      conn.ev.on("messages.upsert", async (messageUpdate) => {
        const replyMek = messageUpdate.messages[0];
        if (!replyMek.message) return;
  
        const messageType =
          replyMek.message.conversation ||
          replyMek.message.extendedTextMessage?.text;
  
        const isReplyToSentMsg =
          replyMek.message.extendedTextMessage &&
          replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
  
        if (isReplyToSentMsg) {
          const selectedNumber = parseInt(messageType.trim());
          if (
            !isNaN(selectedNumber) &&
            selectedNumber > 0 &&
            selectedNumber <= searchResults.length
          ) {
            const selectedMovie = searchResults[selectedNumber - 1];
  
            // Step 3: Fetch download links for the selected movie
            const movieResponse = await fetchJson(
              `https://cinesubz-api-zazie.vercel.app/api/movie?url=${encodeURIComponent(
                selectedMovie.link
              )}`
            );
            const movieData = movieResponse;
  
            if (!movieData.status || !movieData.result.data.dl_links) {
              return await reply("*Error fetching download links for this movie.*");
            }
  
            const { title, imdbRate, image, date, country, duration, dl_links } =
              movieData.result.data;
  
            if (dl_links.length === 0) {
              return await reply(
                "*No download links available for this movie.*"
              );
            }
  
            let downloadMessage = `🎥 *${title}*\n\n`;
            downloadMessage += `⭐ *Rating:* ${imdbRate}\n📅 *Release Date:* ${date}\n🌍 *Country:* ${country}\n⏳ *Duration:* ${duration}\n⚠TELEGRAM LINKS NOT ALLOWED..\n\n`;
            downloadMessage += `*Available Download Links:*\n\n`;
  
            dl_links.forEach((link, index) => {
              downloadMessage += `*${index + 1}.* ${link.quality} - ${link.size}\n${link.link}\n\n`;
            });
           let download = dl_links;
            const sentDownloadMsg = await conn.sendMessage(
              from,
              {
                image: { url: image },
                caption: downloadMessage,
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
                      showAdAttribution: false
                  }
              }
              },
              { quoted: replyMek }
            );
  
            const downloadMessageID = sentDownloadMsg.key.id;
  
            // Step 4: Wait for the user to select a download quality
            conn.ev.on("messages.upsert", async (downloadUpdate) => {
              const downloadReply = downloadUpdate.messages[0];
              if (!downloadReply.message) return;
  
              const downloadMessageType =
                downloadReply.message.conversation ||
                downloadReply.message.extendedTextMessage?.text;
  
              const isReplyToDownloadMsg =
                downloadReply.message.extendedTextMessage &&
                downloadReply.message.extendedTextMessage.contextInfo.stanzaId ===
                  downloadMessageID;
  
              if (isReplyToDownloadMsg) {
                const selectedQuality = parseInt(downloadMessageType.trim());
                if (
                  !isNaN(selectedQuality) &&
                  selectedQuality > 0 &&
                  selectedQuality <= download.length
                ) {
                  const selectedLink = download[selectedQuality - 1];
                  const movieLinkResponse = await fetchJson(
                    `https://cinesubz-api-zazie.vercel.app/api/links?url=${encodeURIComponent(
                      selectedLink.link
                    )}`
                  );
                  const movieLinkData = movieLinkResponse;
  
  
                  const downloadUrl = movieLinkData.result.direct;
                  await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                                
                  await conn.sendMessage(
                    from,
                    {
                      document: { url: downloadUrl },
                      mimetype: "video/mp4",
                      fileName: `${title} - ${selectedLink.quality}.mp4`,
                      caption: `> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`,
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
                            showAdAttribution: false
                        }
                    }
                    },
                    { quoted: downloadReply }
                  );

                  await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                } else {
                  await reply("Invalid selection. Please reply with a valid number.");
                }
              }
            });
          } else {
            await reply("Invalid selection. Please reply with a valid number.");
          }
        }
      });
    } catch (e) {
      console.error("Error during CineSubz command execution:", e);
      reply("*An error occurred while processing your request.*");
    }
  });
  
//======================checkkkkk=============


cmd({
    pattern: "check1",
    react: '🎥',
    category: "movie",
    desc: "Search movies on sinhalasub.lk and get download links",
    use: ".sinhalasub <name>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply('*Please Provide a Search Name. e.g:- Sonic 3*');
        
        var movie = await sinhalaSub();
        const results = await movie.search(q);
        const searchResults = results.result.slice(0, 10);
        
        if (!searchResults || searchResults.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        let resultsMessage = `📽️ *Search Results For:* "${q}":\n\n`;
        searchResults.forEach((result, index) => {
            resultsMessage += `*${index + 1}.* ${result.title}\n🔗 Link: ${result.link}\n\n`;
        });

        const sentMsg = await conn.sendMessage(from, { text: resultsMessage }, { quoted: mek });
        const messageID = sentMsg.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;
            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const isReplyToSentMsg = replyMek.message.extendedTextMessage && replyMek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= searchResults.length) {
                    const selectedMovie = searchResults[selectedNumber - 1];

                    const apiUrl = `https://suhas-bro-api.vercel.app/movie/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;
                    try {
                        const response = await axios.get(apiUrl);
                        const movieData = response.data.result;

                        // Only use `dl_links1` for PixelDrain links
                        const pixelDrainLinks = movieData.dl_links || [];
                        if (pixelDrainLinks.length === 0) {
                            return await reply('No PixelDrain links found.');
                        }

                        let downloadMessage = `🎥 *${movieData.title}*\n\n`;
                        downloadMessage += `*Available PixelDrain Download Links:*\n`;

                        pixelDrainLinks.forEach((link, index) => {
                            downloadMessage += `*${index + 1}.* ${link.quality} - ${link.size}\n🔗 Link: ${link.link}\n\n`;
                        });

                        const pixelDrainMsg = await conn.sendMessage(from, { text: downloadMessage }, { quoted: replyMek });
                        const pixelDrainMessageID = pixelDrainMsg.key.id;

                        conn.ev.on('messages.upsert', async (pdUpdate) => {
                            const pdReply = pdUpdate.messages[0];
                            if (!pdReply.message) return;
                            const pdMessageType = pdReply.message.conversation || pdReply.message.extendedTextMessage?.text;
                            const isReplyToPixelDrainMsg = pdReply.message.extendedTextMessage && pdReply.message.extendedTextMessage.contextInfo.stanzaId === pixelDrainMessageID;

                            if (isReplyToPixelDrainMsg) {
                                const qualityNumber = parseInt(pdMessageType.trim());
                                if (!isNaN(qualityNumber) && qualityNumber > 0 && qualityNumber <= pixelDrainLinks.length) {
                                    const selectedPixelDrainLink = pixelDrainLinks[qualityNumber - 1];
                                    const fileId = selectedPixelDrainLink.link.split('/').pop();
                                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

                                    const directDownloadUrl = `https://pixeldrain.com/api/file/${fileId}`;

                                    await conn.sendMessage(from, { react: { text: '⬆', key: mek.key } });

                                    await conn.sendMessage(from, {
                                        document: { url: directDownloadUrl },
                                        mimetype: "video/mp4",
                                        fileName: `${movieData.title} - ${selectedPixelDrainLink.quality}.mp4`,
                                        caption: `${movieData.title}\nQuality: ${selectedPixelDrainLink.quality}\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`,
                                        contextInfo: {
                                            mentionedJid: [],
                                            externalAdReply: {
                                                title: movieData.title,
                                                body: 'Download powered by SinhalaSub',
                                                mediaType: 1,
                                                sourceUrl: selectedMovie.link,
                                                thumbnailUrl: movieData.image
                                            }
                                        }
                                    }, { quoted: pdReply });

                                    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                                } else {
                                    await reply('Invalid selection. Please reply with a valid number.');
                                }
                            }
                        });

                    } catch (error) {
                        console.error('Error fetching movie details:', error);
                        await reply('An error occurred while fetching movie details. Please try again.');
                    }
                } else {
                    await reply('Invalid selection. Please reply with a valid number.');
                }
            }
        });

    } catch (error) {
        console.error('Error during search:', error);
        reply('*An error occurred while searching!*');
    }
});

