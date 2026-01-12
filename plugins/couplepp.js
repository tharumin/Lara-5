
const { cmd } = require('../command'); // Make sure the path is correct
const photoOxy = require('@sl-code-lords/photooxy'); // Import PhotoOxy for meme generation

const { fetchJson } = require('../lib/functions'); // Make sure the path is correct

const apilink = 'https://api.fgmods.xyz/api/img/couple?apikey=nRHt2lt5'; // API LINK ( DO NOT CHANGE THIS!! )

cmd({
    pattern: "couplepp",
    alias: ["couplepic"],
    react: "💑",
    desc: "Get a couple image",
    category: "wallpaper",
    use: '.couple',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
    try {
        const coupleData = await fetchJson(apilink);

        if (!coupleData.status) return await reply("Failed to fetch couple image!");

        const msg = `
*SUHAS-MD Couple Images.💑*
      
         ◈ *Author* - SuhasBro
         ◈ *Boy* - ${coupleData.result.boy}
         ◈ *Girl* - ${coupleData.result.girl}\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
        `;

        // Sending the message with couple images
        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
            }
        });

        // Sending images of the couple
        await conn.sendMessage(from, { image: { url: coupleData.result.boy }, caption: "✨ 𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 💕 - 💑 - 𝗕𝗼𝘆" }, { quoted: mek });
        await conn.sendMessage(from, { image: { url: coupleData.result.girl }, caption: "✨ 𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 💕 - 💑 - 𝗚𝗶𝗿𝗹" }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while processing your request. Please try again later.');
    }
});


//meme in this
    
cmd({
    pattern: "meme",
    alias: ["memegen"],
    react: "😂", 
    desc: "Generate a meme with text",
    category: "fun",
    use: '.meme <top text> | <bottom text>',
    filename: __filename
},
async(conn, mek, m, { from, reply, q }) => {
    try {
        const [topText, bottomText] = q.split("|").map(text => text.trim());
        if (!topText || !bottomText) return await reply("Please provide top and bottom text for the meme!");

        const memeImage = await photoOxy.memeGenerator(topText, bottomText);
        await conn.sendMessage(from, { image: { url: memeImage } }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while generating the meme. Please try again later.');
    }
});
