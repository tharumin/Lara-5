const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var request = require("request")
var axios = require("axios")
var cheerio = require("cheerio")
const fetch = require("node-fetch")
cmd({
    pattern: "spotify",
    alias: ["spot"],
    use: '.spotify *<Song Name>*',
    react: "📥",
    desc: "Download Videos from Twitter..",
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
//if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
if (!q) return reply('*Please give me words to search.⁉️*')
let res = await fetchJson('https://api-pink-venom.vercel.app/api/spotify?q='+q)
const data = res.result
if (data.length < 1) return await conn.sendMessage(from, { text: "🚩 *I couldn't find anything :(*" }, { quoted: mek } )
    var rows = [];  
    for (var i = 0; i < data.length; i++) {
	rows.push({
        buttonId: `${prefix}spotifydl ${data[i].link}`,
        buttonText: { displayText: data[i].name + data[i].artist },
        type: 1
          });
        }

          
const buttonMessage = {
  image: `https://img.freepik.com/premium-vector/social-media-spotify-logo-editorial-music-service-spotify-logotype-modern-design-social-media-spotify-full-inscription-green-logo-vector-illustration_399089-9834.jpg?w=1060`,
  caption: `*SUHAS-MD Spotify Search.🎶*`,
  footer: config.FOOTER,
  buttons: rows,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})

//------------------------dl---------------
cmd({
  pattern: "spotifydl",
    desc: "Download Spotify Songs.",
    react: "🗂",
    category: "bot",
    use: ".spotifidl <nams>" ,
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me spotify url.*')
let res = await fetchJson('https://api-pink-venom.vercel.app/api/spotifydl?url=='+q)
let x = res.info
let dat = `*SUHAS-MD Spotify Download.📥*

◈ *Title:* ${x.title}
◈ *Released:* ${x.artists}
◈ *Artist* ${x.artists}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
`
	
        const message = {
            document: await getBuffer(res.dllink),
            mimetype: 'audio/mpeg',
            fileName: `${x.title}.mp3`,
            jpegThumbnail: await (await fetch(x.cover)).buffer(),
            caption: dat,
        };
        await conn.sendMessage(from, message, { quoted: mek });
} catch (e) {
reply(N_FOUND)
console.log(e)
}
})

cmd({
    pattern: "weather1",
    desc: "Get weather information for a location",
    react: "🌤",
    category: "search",
    use: '.weather *<City Name>*',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const weatherInfo = `
*SUHAS-MD Weather Information for ${data.name}, ${data.sys.country}*

◈ *Temperature*: ${data.main.temp}°C
◈ *Feels Like*: ${data.main.feels_like}°C
◈ *Min Temp*: ${data.main.temp_min}°C
◈ *Max Temp*: ${data.main.temp_max}°C
◈ *Humidity*: ${data.main.humidity}%
◈ *Weather*: ${data.weather[0].main}
◈ *Description*: ${data.weather[0].description}
◈ *Wind Speed*: ${data.wind.speed} m/s
◈ *Pressure*: ${data.main.pressure} hPa

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
`;

        return reply(weatherInfo);
    } catch (e) {
        console.error(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});


cmd({
    pattern: "wiki",
    desc: "Search Wikipedia for a summary.",
    category: "search",
    use: '.wiki *<Your Text>*',
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length < 1) return reply('❗ Please provide a search term.');

        const query = args.join(' ');
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

        const response = await axios.get(url);
        const { extract, title } = response.data;

        const message = `*${title}*\n\n${extract}\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;
        return await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply('⚠️ An error occurred while searching Wikipedia. Please try again later.');
    }
});

cmd({
    pattern: "igstalk",
    alias: ["instastalk","instagramstalk","igstalker"],
    react: '📷',
    desc: "It gives details of given instagram username.",
    category: "search",
    use: '.igstalk <instagram username>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Please give me a instagram username !*")
const nama = `https://dumpor.io/v/${q}`
        const data = await axios.get(nama);
        const $ = cheerio.load(data.data);

        const username = $('h1.text-4xl').text().trim();
        const fullName = $('h2.text-2xl').text().trim();
        const followers = $('.stat-title:contains("Followers")').next().text().trim();
        const following = $('.stat-title:contains("Following")').next().text().trim();
        const profilePic = $('.avatar img').attr('src');
        const bio = $('.text-sm.font-serif').html().trim().replace(/<br\s*\/?>/g, '\n'); // Replace <br> with newline
const cap = `*SUHAS-MD InstaStalk.💐*

*◈ Username:* ${username}
*◈ Name:* ${fullName}
*◈ Bio:* ${bio}
*◈ Following:* ${following}
*◈ Followers:* ${followers}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳* `
await conn.sendMessage(from, { image: { url: profilePic }, caption: cap }, { quoted: mek })
} catch (e) {
reply("*I cant find this user on instagram !*")
console.log(e)
}
})

cmd({
    pattern: "ip",
    alias: ["ipstalk","sip","searchip","ip-locator"],
    react: '🌐',
    desc: "It downloads songs from soundcloud.",
    category: "search",
    use: '.ipstalk *<IP Address>*',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var desct = "It gives details of given ip."
var needus = "*Please give me a ip !*" 
var cantf = "*I cant find this ip !*"
if(!q) return reply(needus)
if(!q.includes('.')) return reply(needus)
const IP = "IP :"
const ST = "STATUS :"
const CONTINENT = "CONTINENT :"
const COUNTRY = "COUNTRY :"
const COUNTRYCODE = "COUNTRYCODE :"
const REGIONNAME = "REGIONNAME :"
const CITY = "CITY :"
const ZIP = "ZIP :"
const CURRENCY = "CURRENCY :"
const ISP = "ISP :"
const MOBILE = "MOBILE :"
const PROXY = "PROXY :"
const r = await fetchJson('https://api.techniknews.net/ipgeo/' + q)
const wea = `*SUHAS-MD IP Look Up.🌟*
    
` +
'*◦' + IP +'* ```' + q + '```\n' +
'*◦' + ST +'* ```' + r.status+ '```\n' +
    '*◦' + CONTINENT +'* ```' + r.continent+ '```\n' +
    '*◦' + COUNTRY +'* ```' + r.country+ '```\n' +
    '*◦' + COUNTRYCODE +'* ```' + r.countryCode+ '```\n' +
    '*◦' + REGIONNAME +'* ```' + r.regionName+ '```\n' +
    '*◦' + CITY +'* ```' + r.city+ '```\n' +
    '*◦' + ZIP +'* ```' + r.zip+ '```\n' +
    '*◦' + CURRENCY +'* ```' + r.currency+ '```\n' +
    '*◦' + ISP +'* ```' + r.isp+ '```\n' +
    '*◦' + PROXY +'* ```' + r.proxy+ '```\n' +
    '*◦' + MOBILE +'* ```' + r.mobile+ '```\n\n'
await conn.sendMessage(from , { text: wea}, { quoted: mek } )
} catch (e) {
reply(cantf)
console.log(e)
}
})
var N_FOUND  = "*I couldn't find anything :(*"
var urlneed  = "It downloads songs from soundcloud."
var imgmsg = "```Please write a few words!```"


async function ssearch (i){let e="https://m.soundcloud.com",t=await axios.get(`${e}/search?q=${encodeURIComponent(i)}`,{headers:{"User-Agent":'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}}),a=cheerio.load(t.data),d=[];return a("div > ul > li > div").each((function(i,t){let r=a(t).find("a").attr("aria-label"),v=e+a(t).find("a").attr("href"),s=a(t).find("a > div > div > div > picture > img").attr("src"),n=a(t).find("a > div > div > div").eq(1).text(),o=a(t).find("a > div > div > div > div > div").eq(0).text(),u=a(t).find("a > div > div > div > div > div").eq(1).text(),l=a(t).find("a > div > div > div > div > div").eq(2).text();d.push({title:r,url:v,thumb:s,artist:n,views:o,release:l,timestamp:u})})),{status:t.status,creator:"Caliph",result:d}}

cmd({
    pattern: "soundcloud",
    react: "📱",
    alias: ["song2","scdl"],
    desc: urlneed,
    category: "download",
    use: '.soundcloud *<Song Name>*',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await conn.sendMessage(from , { text: imgmsg }, { quoted: mek } )        
const data2 = await ssearch(q)
const data = data2.result
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
    
    var rows = [];  
    for (var i = 0; i < data.length; i++) {
	rows.push({
        buttonId: prefix + 'selectaud2 ' + data[i].url,
        buttonText: { displayText: data[i].title + data[i].artist },
        type: 1
          });
        }

          
const buttonMessage = {
  image: `https://www.nme.com/wp-content/uploads/2020/04/2020_soundcloudlogo_press_2000x1270.jpg`,
  caption: `*SUHAS-MD Sound Cloud Search.🎶*`,
  footer: config.FOOTER,
  buttons: rows,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply('*ERROR !!*')
  console.log(e)
}
})

cmd({
  pattern: "selectaud2",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let dat = `*SUHAS-MD Sound Cloud Downloader.📥*`
const buttons = [
  {buttonId: prefix + 'sounddoc ' + q, buttonText: {displayText: 'DOCUMENT SONG'}, type: 1},
  {buttonId: prefix + 'soundaud ' + q, buttonText: {displayText: 'AUDIO SONG'}, type: 1}
]
  const buttonMessage = {
      caption: dat,
      footer: config.FOOTER,
      buttons: buttons,
      headerType: 1
  }
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply(N_FOUND)
console.log(e)
}
})


cmd({
    pattern: "sounddoc",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 
let res = await fetchJson(`https://api.fgmods.xyz/api/downloader/soundcloud?url=${q}&apikey=2gw4M2yfB5`)
let data = res.result
let listdata = `*◦ Name :* ${data.title}
*◦ Duration :* ${data.duration}
*◦ Bitrate :* ${data.quality}\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳* `
        const message = {
            document: { url: data.dl_url },
            mimetype: 'audio/mpeg',
            fileName: `${data.title}.mp3`,
            jpegThumbnail: await (await fetch(data.thumb)).buffer(),
            caption: listdata,
        };
        await conn.sendMessage(from, message, { quoted: mek });
} catch (e) {
    reply('*ERROR !!*')
  console.log(e)
}
})

cmd({
  pattern: "soundaud",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 
let res = await fetchJson(`https://api.fgmods.xyz/api/downloader/soundcloud?url=${q}&apikey=2gw4M2yfB5`)
let data = res.result
let listdata = `*◦ Name :* ${data.title}
*◦ Duration :* ${data.duration}
*◦ Bitrate :* ${data.quality}\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳* `
let mal = await conn.sendMessage(from, { image: { url: data.thumb }, caption: listdata }, { quoted: mek })
await conn.sendMessage(from, { audio: { url: data.dl_url }, mimetype: 'audio/mpeg' }, { quoted: mek })
} catch (e) {
  reply('*ERROR !!*')
console.log(e)
}
})
