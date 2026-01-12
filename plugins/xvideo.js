
const { cmd } = require('../command') // Make sure the path is correct
const xnxx = require("xnxx-dl");
const { fetchJson, getBuffer, getRandom } = require('../lib/functions');

const apilink = 'https://www.dark-yasiya-api.site/' // API LINK ( DO NOT CHANGE THIS!! )

cmd({
    pattern: "xvideo",
    alias: ["xvdl2", "xvdown2"],
    react: "🔞",
    desc: "Download XVideos in xvideo.com",
    category: "download",
    use: '.xvideo <text>',
    filename: __filename
},
async(conn, mek, m, { from, quoted, reply, q }) => {
try {
    if (!q) return await reply("𝖯𝗅𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝗆𝖾 𝖶𝗈𝗋𝖽.❗");

    const xv_list = await fetchJson(`${apilink}/search/xvideo?text=${q}`);
    if (xv_list.result.length < 1) return await reply("No results found.⁉️");

    const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${xv_list.result[0].url}`);

    // Prepare the message
    const msg = `
        *SUHAS-MD XVIDEO DOWNLOADER* 🔞

        ◈ *𝖳𝗂𝗍𝗅𝗂𝖾* - ${xv_info.result.title}
        ◈ *𝖵𝗂𝖾𝗐𝗌* - ${xv_info.result.views}
        ◈ *𝖫𝗂𝗄𝖾* - ${xv_info.result.like}
        ◈ *𝖣𝖾𝗌𝗅𝗂𝗄𝖾* - ${xv_info.result.deslike}
        ◈ *𝖲𝗂𝗓𝖾* - ${xv_info.result.size}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

    // Sending the message with details
    const sentMsg = await conn.sendMessage(from, {
        text: msg,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: 'S U H A S  -  M D 🇱🇰',
                newsletterJid: "120363371157309766@newsletter",
            },
            externalAdReply: {
                title: `ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ`,
                body: `Can't Find The Details.Try Again Later.`,
                thumbnailUrl: xv_info.result.image,
                sourceUrl: ``,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: mek });

    
await conn.sendMessage(from, { video: { url: xv_info.result.dl_link }, caption: xv_info.result.title }, { quoted: mek });

} catch (error) {
    console.error(error);
    reply('An error occurred while processing your request. Please try again later.');
}
});

// XNXX video download command
cmd({
    pattern: "xnxx",
    desc: "Downloads a video from XNXX",
    use: '.xnxx <text>',
    react: "🔞",
    category: "downloads",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply }) => {
    const searchTerm = q.trim();
    if (!searchTerm) return reply(`Please Give me a Word to Search.❗`);

    reply(`*SUHAS-MD Searching Your Video...🎥*`);
    try {
        // Search for the video and download
        const videoInfo = await xnxx.download(searchTerm);
        if (!videoInfo || !videoInfo.link_dl) {
            return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }

        reply(`*SUHAS-MD Downloading Video...🍟*`);
        const videoUrl = videoInfo.link_dl;
        await conn.sendMessage(
            from,
            { video: { url: videoUrl }, caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*', mimetype: 'video/mp4' }, 
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`Error: ${e.message}`);
    }
});

module.exports = {};
