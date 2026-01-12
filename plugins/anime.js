const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs');
const axios = require('axios')
let { img2url } = require('@blackamda/telegram-image-url');
var imgmsg = "*Give me a anime name !*"
var descgs = "It gives details of given anime name."
var cants = "I cant find this anime."

cmd({
    pattern: "animesearch",
    alias: ["animesearchh","sanime"],
    react: "🍄",
    desc: descgs,
    category: "wallpaper",
    use: '.anime *<Anime Name>*',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply(imgmsg)
let anu = await fetchJson(`https://api.jikan.moe/v4/anime?q=${q}`)
let sections = []   
for (let i of anu.data) {
const list = {title: `${i.title}`,
rows: [
{
title: `${i.title}`, 
rowId: `${prefix}animeeg ${i.mal_id}`
}, 
]
}
sections.push(list)   
}
let listset = {
text: `
*SUHAS-MD ANIME SEARCH 🍄*
   
*Search Results From* 🌸 ${q}`,
footer: config.FOOTER,
title: "",
buttonText: '*🔢 Reply Below Number*',
sections
}
await conn.listMessage(
from, 
listset,mek)
} catch (e) {
  reply(cants)
 console.log(e)
}})


cmd({
    pattern: "animeeg",
    dontAddCommandList: true,
    filename: __filename
  },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{
  await conn.sendMessage(from, { react: { text: '🍄', key: mek.key }})
  res = await fetchJson(`https://api.jikan.moe/v4/anime/${q}`)
  let txt = `*TITLE:* *${res.data.title}*\n*ENGLISH:* *${res.data.title_english}*\n*JAPANESE:* *${res.data.title_japanese}*\n*TYPE ANIME:* *${res.data.type}*\n*ADAPTER:* *${res.data.source}*\n*TOTAL EPISODE:* *${res.data.episodes}*\n*STATUS:* *${res.data.status}*\n*ONGOING:* *${res.data.airing ? 'Ya' : 'DRIS'}*\n*AIRED:* *${res.data.aired.string}*\n*DURATION:* *${res.data.duration}*\n*RATING:* *${res.data.rating}*\n*SCORE:* *${res.data.score}*\n*RANK:* *${res.data.rank}*\n*STUDIO:* *${res.data.studios[0].name}* `
  conn.sendMessage(from, { image : { url : res.data.images.jpg.image_url}, caption : txt}, {quoted :mek }).catch((err) => reply(''))
  await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
  } catch (e) {
  reply(cants)
  console.log(e)
  }
  })

const botwatermark= config.FOOTER

let lolivid = [
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli1.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli2.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli3.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli4.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli5.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli6.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli7.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli8.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli9.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli10.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli11.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli12.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli13.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli14.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli15.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli16.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli17.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli18.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli19.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli20.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli21.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli22.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli23.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli24.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli25.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli26.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli27.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli28.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli29.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli30.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli31.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli32.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli33.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli34.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli35.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli36.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli37.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli38.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli39.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli40.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli41.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli42.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli43.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli44.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli45.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli46.mp4',
  'https://raw.githubusercontent.com/NurFy/txt/main/asupan-loli/loli47.mp4',
];
cmd({
    pattern: "lolivid",
    desc: "Fetch random anime short video.",
    category: "wallpaper",
    use: '.lolivid',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {

await m.react("🍄")

const res = await lolivid[Math.floor(Math.random() * lolivid.length)];

await conn.sendMessage(from,{video: {url: res },mimetype: "video/mp4",caption: botwatermark},{quoted: mek})

  
}catch(e){
console.log(e)
reply(`${e}`)
}
})

const fetchAndSendImage = async (conn, mek, from, apiUrl, caption, isVideo = false) => {
    try {
        await mek.react("🍄");
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (isVideo) {
            await conn.sendMessage(from, { video: { url: data.result.url }, mimetype: "video/mp4", caption }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { image: { url: data.url }, caption }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
};

const commas = [
    { pattern: "agirl", apiUrl: "https://api.waifu.pics/sfw/waifu", desc: "Fetch random anime girl image." },
    { pattern: "aneko", apiUrl: "https://api.waifu.pics/sfw/neko", desc: "Fetch random neko image." },
    { pattern: "ashinobu", apiUrl: "https://api.waifu.pics/sfw/shinobu", desc: "Fetch random shinobu image." },
    { pattern: "amegumin", apiUrl: "https://api.waifu.pics/sfw/megumin", desc: "Fetch random megumin image." },
    { pattern: "abully", apiUrl: "https://api.waifu.pics/sfw/bully", desc: "Fetch random bully image." },
    { pattern: "acuddle", apiUrl: "https://api.waifu.pics/sfw/cuddle", desc: "Fetch random cuddle image." },
    { pattern: "acry", apiUrl: "https://api.waifu.pics/sfw/cry", desc: "Fetch random cry image." },
    { pattern: "ahug", apiUrl: "https://api.waifu.pics/sfw/hug", desc: "Fetch random hug image." },
    { pattern: "aawoo", apiUrl: "https://api.waifu.pics/sfw/awoo", desc: "Fetch random awoo image." },
    { pattern: "akiss", apiUrl: "https://api.waifu.pics/sfw/kiss", desc: "Fetch random kiss image." },
    { pattern: "alick", apiUrl: "https://api.waifu.pics/sfw/lick", desc: "Fetch random lick image." },
    { pattern: "apat", apiUrl: "https://api.waifu.pics/sfw/pat", desc: "Fetch random pat image." },
    { pattern: "asmug", apiUrl: "https://api.waifu.pics/sfw/smug", desc: "Fetch random smug image." },
    { pattern: "abonk", apiUrl: "https://api.waifu.pics/sfw/bonk", desc: "Fetch random bonk image." },
    { pattern: "ayeet", apiUrl: "https://api.waifu.pics/sfw/yeet", desc: "Fetch random yeet image." },
    { pattern: "ablush", apiUrl: "https://api.waifu.pics/sfw/blush", desc: "Fetch random blush image." },
    { pattern: "asmile", apiUrl: "https://api.waifu.pics/sfw/smile", desc: "Fetch random smile image." },
    { pattern: "awave", apiUrl: "https://api.waifu.pics/sfw/wave", desc: "Fetch random wave image." },
    { pattern: "ahighfive", apiUrl: "https://api.waifu.pics/sfw/highfive", desc: "Fetch random highfive image." },
    { pattern: "ahandhold", apiUrl: "https://api.waifu.pics/sfw/handhold", desc: "Fetch random handhold image." },
    { pattern: "anom", apiUrl: "https://api.waifu.pics/sfw/nom", desc: "Fetch random nom image." },
    { pattern: "abite", apiUrl: "https://api.waifu.pics/sfw/bite", desc: "Fetch random bite image." },
    { pattern: "aglomp", apiUrl: "https://api.waifu.pics/sfw/glomp", desc: "Fetch random glomp image." },
    { pattern: "aslap", apiUrl: "https://api.waifu.pics/sfw/slap", desc: "Fetch random slap image." },
    { pattern: "akill", apiUrl: "https://api.waifu.pics/sfw/kill", desc: "Fetch random kill image." },
    { pattern: "akick", apiUrl: "https://api.waifu.pics/sfw/kick", desc: "Fetch random kick image." },
    { pattern: "ahappy", apiUrl: "https://api.waifu.pics/sfw/happy", desc: "Fetch random happy image." },
    { pattern: "awink", apiUrl: "https://api.waifu.pics/sfw/wink", desc: "Fetch random wink image." },
    { pattern: "apoke", apiUrl: "https://api.waifu.pics/sfw/poke", desc: "Fetch random poke image." },
    { pattern: "adance", apiUrl: "https://api.waifu.pics/sfw/dance", desc: "Fetch random dance image." },
    { pattern: "acringe", apiUrl: "https://api.waifu.pics/sfw/cringe", desc: "Fetch random cringe image." },
    { pattern: "loli", apiUrl: "https://api.lolicon.app/setu/v2?num=1&r18=0&tag=lolicon", desc: "Download anime loli images." },
    { pattern: "waifu", apiUrl: "https://api.waifu.pics/sfw/waifu", desc: "Download anime waifu images." },
    { pattern: "neko", apiUrl: "https://api.waifu.pics/sfw/neko", desc: "Download anime neko images." },
    { pattern: "megumin", apiUrl: "https://api.waifu.pics/sfw/megumin", desc: "Download anime megumin images." },
    { pattern: "maid", apiUrl: "https://api.waifu.im/search/?included_tags=maid", desc: "Download anime maid images." },
    { pattern: "ass", apiUrl: "https://api.waifu.im/search/?included_tags=ass", desc: "Download anime awoo images." },
    { pattern: "ecchi", apiUrl: "https://api.waifu.im/search/?included_tags=ecchi", desc: "Download anime ecchi images." },
    { pattern: "ero", apiUrl: "https://api.waifu.im/search/?included_tags=ero", desc: "Download anime ero images." },
    { pattern: "milf", apiUrl: "https://api.waifu.im/search/?included_tags=milf", desc: "Download anime milf images." },
    { pattern: "couple", apiUrl: "https://api-fix.onrender.com/api/randomgambar/couplepp", desc: "Download couple images." },
];

commas.forEach(({ pattern, apiUrl, desc, isVideo }) => {
    cmd({
        pattern,
        desc,
        category: "wallpaper",
        use: `.${pattern}`,
        filename: __filename
    }, async (conn, mek, m, { from }) => {
        if (pattern === "couple") {
            try {
                const res = await fetchJson(apiUrl);
                const wm = `🏖 SUHAS-MD Random Anime images.🏖\n\n${config.FOOTER}`;
                await conn.sendMessage(from, { image: { url: res.result.male }, caption: wm }, { quoted: mek });
                await conn.sendMessage(from, { image: { url: res.result.female }, caption: wm }, { quoted: mek });
            } catch (e) {
                console.log(e);
                reply(cants);
            }
        } else {
            fetchAndSendImage(conn, mek, from, apiUrl, botwatermark, isVideo);
        }
    });
});


//animegirl in this

cmd({
    pattern: "animegirl",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".animegirl",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});



cmd({
    pattern: "animegirl1",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".animegirl1",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});




cmd({
    pattern: "animegirl2",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".animegirl2",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});


cmd({
    pattern: "animegirl3",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".animegirl3",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});



cmd({
    pattern: "animegirl4",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".animegirl4",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl5",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".animegirl5",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});


//======

cmd({
    pattern: "neko",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".neko",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});



cmd({
    pattern: "waifu",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".waifu",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});




cmd({
    pattern: "shoow",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".shoow",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});


cmd({
    pattern: "meku",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".meku",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});



cmd({
    pattern: "sowe",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".sowe",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "urwz",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".urwz",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

//=============

cmd({
    pattern: "boil",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".boil",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});



cmd({
    pattern: "soul",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".soul",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});




cmd({
    pattern: "cutest",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".cutest",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});


cmd({
    pattern: "cyer",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".cyer",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});



cmd({
    pattern: "sigmas",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".sigmas",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "lios",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "?",
    use: ".lios",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '> *漏 饾櫩饾殬饾殸饾殠饾殯饾殠饾殟 饾櫛饾殺 饾殏饾殑饾櫡饾櫚饾殏  銆斤笍饾櫝*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});


//

//====== Anime&Nsfw=====

cmd({
    pattern: "anime1",
    desc: "Anime image.",
    react: "🧚‍♀️",
    category: "wallpaper",
    use: '.anime1',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/aD7t0Bc.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/PQO5wPN.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/5At1P4A.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/MjtH3Ha.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/QQW7VKy.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "anime2",
    desc: "Anime image.",
    react: "🧚‍♀️",
    category: "wallpaper",
    use: '.anime2',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/0r1Bn88.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/2Xdpuov.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/0hx-3AP.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/q054x0_.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/4lyqRvd.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime3",
    desc: "Anime image.",
    react: "🧚‍♀️",
    category: "wallpaper",
    use: '.anime3',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/gnpc_Lr.jpeg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/P6X-ph6.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/~p5W9~k.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/7Apu5C9.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/OTRfON6.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime4",
    desc: "Anime image.",
    react: "🧚‍♀️",
    category: "wallpaper",
    use: '.anime4',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/aGgUm80.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/i~RQhRD.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/94LH-aU.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/V8hvqfK.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/lMiXE7j.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime5",
    desc: "Anime image.",
    react: "🧚‍♀️",
    category: "wallpaper",
    use: '.anime5',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/-ABlAvr.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/HNEg0-Q.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/3x~ovC6.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/brv-GJu.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/FWE8ggD.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//====================================


cmd({
    pattern: "nsfw1",
    desc: "Anime Nafw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw1',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/T~-Iwuz.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/2K15s2Y.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/-DRn~lc.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/48KNR5y.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/LYc-XvY.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "nsfw2",
    desc: "Anime Nsfw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw2',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/edvuBYd.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/s_ITZR7.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/Hbx~Cdd.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/0FRrqpH.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/wJs6zJl.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "nsfw3",
    desc: "Anime Nsfw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw3',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/feQcyQE.com_0251.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/kal-XHz.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/GXiQ06F.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/neO9nJh.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/EEUSyCw.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "nsfw4",
    desc: "Anime Nsfw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw4',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/f1qIjfr.com_0085.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/N4kwxsY.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/tnxZGk1.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/v5h7wkU.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/fOqWanW.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "nsfw5",
    desc: "Anime Nsfw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw5',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/yk60HAH.com_0289.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/QSK9W1l.com_0363.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/FBtf~bz.com_0224.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/VLkPlm3.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/-pn1uiI.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


//============

cmd({
    pattern: "nsfw6",
    desc: "Anime Nafw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw1',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/T~-Iwuz.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/2K15s2Y.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/-DRn~lc.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/48KNR5y.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/LYc-XvY.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "nsfw7",
    desc: "Anime Nsfw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw2',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/edvuBYd.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/s_ITZR7.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/Hbx~Cdd.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/0FRrqpH.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/wJs6zJl.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "nsfw8",
    desc: "Anime Nsfw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw3',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/feQcyQE.com_0251.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/kal-XHz.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/GXiQ06F.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/neO9nJh.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/EEUSyCw.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "nsfw9",
    desc: "Anime Nsfw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw4',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/f1qIjfr.com_0085.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/N4kwxsY.png` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/tnxZGk1.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/v5h7wkU.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/fOqWanW.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "nsfw10",
    desc: "Anime Nsfw image.",
    react: "🔞",
    category: "nsfw",
    use: '.nsfw5',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/yk60HAH.com_0289.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/QSK9W1l.com_0363.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/FBtf~bz.com_0224.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/VLkPlm3.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/-pn1uiI.jpg` },caption: '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//pair in this

cmd({
    pattern: "pair",
    alias: ["register","link"],
    react: "🔢",
    desc: "Get Pair Code",
    category: "others",
    use: '.pair < Your number >',
    filename: __filename
},
async(conn, mek, m,{ from, prefix, quoted, q, reply }) => {
try{
if(!q) return await reply("*Example - :* .pair +94774132871")
const pair = await fetchJson(`https://awais-md-pair.onrender.com/code?number=${q}`)
const done = `_*Your Number Paired Successfully...✅*_`

await conn.sendMessage(m.chat, {document: fs.readFileSync("./package.json"),
            fileName: `✨ 𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 💕`,
            mimetype: "application/pdf",
            fileLength: 99999999999999,
            pageCount: 2024, caption: `${pair.code}`,
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
	newsletterName: 'S U H A S  -  M D 🇱🇰',
		newsletterJid: "120363371157309766@newsletter",
		},
		externalAdReply: {  
title: `ᴀ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ`, 
body: '',
thumbnailUrl: 'https://i.ibb.co/dsVjfnc7/20250130-192703.jpg' ,
sourceUrl: "https://chat.whatsapp.com/I3rmraKSPx0JnLnYEW6kUb" , 
mediaType: 1,
renderLargerThumbnail: false
}}}, {quoted:mek})

m.reply(`${done}`)
} catch (e) {
console.log(e)
reply(e)
}}
)
