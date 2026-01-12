const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const apilink1 = 'https://suhas-bro-api.vercel.app/news/cricbuzz' // API LINK ( DO NOT CHANGE THIS!! )
const apilink2 = 'https://suhas-bro-api.vercel.app/news/lankadeepa' // API LINK ( DO NOT CHANGE THIS!! )
const apilink3 = 'https://suhas-bro-api.vercel.app/news/bbc' // API LINK ( DO NOT CHANGE THIS!! )
const apilink4 = 'https://suhas-bro-api.vercel.app/news/itn' // API LINK ( DO NOT CHANGE THIS!! )
const apilink5 = 'https://suhas-bro-api.vercel.app/news/hiru' // API LINK ( DO NOT CHANGE THIS!! )
const apilink6 = 'https://suhas-bro-api.vercel.app/news/derana' // API LINK ( DO NOT CHANGE THIS!! )
const apilink7 = 'https://suhas-bro-api.vercel.app/news/siyatha' // API LINK ( DO NOT CHANGE THIS!! )
const apilink8 = 'https://suhas-bro-api.vercel.app/news/gossiplankanews' // API LINK ( DO NOT CHANGE THIS!! )
const apilink9 = 'https://suhas-bro-api.vercel.app/news/dasathalankanews' // API LINK ( DO NOT CHANGE THIS!! )
const apilink10 = 'https://suhas-bro-api.vercel.app/news/silumina' // API LINK ( DO NOT CHANGE THIS!! )

cmd({
    pattern: "cricketanews",
    alias: ["cricket","news4"],
    react: "🏏",
    desc: "get cricket news",
    category: "news",
    use: '.cricketnews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink1}`)
  
const msg = `
           🏏 *CRICKET NEWS* 🏏

       
◈ *Title* - ${news.result.title}

◈ *Score* - ${news.result.score}

◈ *Win* - ${news.result.to_win}

◈ *Link* - ${news.result.link}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage(from, {  text: msg }, { quoted: mek }) // FIXED LINE
} catch (e) {
console.log(e)
reply('Error fetching news. Please try again later.') // Also add a reply in case of failure.
}
})

// ================================LANKADEEPA NEWS========================================

cmd({
    pattern: "lankadeepanews",
    alias: ["lankadeepa","news4"],
    react: "🕵️‍♂️",
    desc: "get lankadeepa news.",
    category: "news",
    use: '.lankadeepanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink2}`)
  
const msg = `
           🇱🇰 *LANKADEEPA NEWS* 🇱🇰

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Date* - ${news.result.date}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================BBC NEWS========================================

cmd({
    pattern: "bbcnews",
    alias: ["bbc","news5"],
    react: "⛩",
    desc: "get bbc news",
    category: "news",
    use: '.bbcnews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink3}`)
  
const msg = `
           ⛩ *BBC NEWS* ⛩

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳* `


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "itnnews",
    alias: ["itn","news6"],
    react: "🇱🇰",
    desc: "get itn news.",
    category: "news",
    use: '.itnnews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink4}`)
  
const msg = `
           🇱🇰 *ITN NEWS* 🇱🇰

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Date* - ${news.result.date}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "hirunews",
    alias: ["hiru","news7"],
    react: "⭐",
    desc: "get hiru news.",
    category: "news",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink5}`)
  
const msg = `
           ⭐ *HIRU NEWS* ⭐

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Date* - ${news.result.date}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "derananews",
    alias: ["derana","news8"],
    react: "🌀",
    desc: "get derana news.",
    category: "news",
    use: '.derananews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink6}`)
  
const msg = `
           🌀 *DERANA NEWS* 🌀

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Date* - ${news.result.date}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "siyathanews",
    alias: ["siyatha","news9"],
    react: "📰",
    desc: "get siyatha news.",
    category: "news",
    use: '.siyathanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink7}`)
  
const msg = `
           📰 *SIYATHA NEWS* 📰

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Date* - ${news.result.date}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "gossiplankanews",
    alias: ["gossiplanka","news10"],
    react: "🇱🇰",
    desc: "get gossiplanka news.",
    category: "news",
    use: '.gossiplankanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink8}`)
  
const msg = `
           🇱🇰 *GOSSIPLANKA NEWS* 🇱🇰

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Date* - ${news.result.date}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "dasathalankanews",
    alias: ["dasathalanka","news11"],
    react: "🇱🇰",
    desc: "get dasathalanka news.",
    category: "news",
    use: '.dasathalankanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink9}`)
  
const msg = `
           🇱🇰 *DASATHALANKA NEWS* 🇱🇰

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Date* - ${news.result.date}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "siluminanews",
    alias: ["silumina","news12"],
    react: "🇱🇰",
    desc: "get silumina news.",
    category: "news",
    use: '.siluminanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink10}`)
  
const msg = `
           🇱🇰 *SILUMINA NEWS* 🇱🇰

       
◈ *Title* - ${news.result.title}

◈ *News* - ${news.result.desc}

◈ *Date* - ${news.result.date}

◈ *Link* - ${news.result.url}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})
