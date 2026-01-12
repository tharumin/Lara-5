const config = require('../config');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');
const { unsplash, pixabay } = require("@sl-code-lords/image-library");
const axios = require('axios');
const cheerio = require('cheerio');

const imgmsg = "```Please write a few words!```";
const errt = "*I couldn't find anything :(*";
const foot = config.FOOTER;

// Command for Unsplash
cmd({
    pattern: "unsplash",
    react: '🖼️', 
    alias: ["unsplashdl"],
    desc: "Search for related pics on unsplash.com.",
    category: "download",
    use: '.unsplash *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const results = await unsplash.search({ "query": q, page: 1 });
        const data = results.result;
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        reply(errt);
        console.log(e);
    }
});

// Command for Pixabay
cmd({
    pattern: "pixabay",
    react: '🖼️',
    alias: ["pixabaydl"],
    desc: "Search for related pics on pixabay.com.",
    category: "download",
    use: '.pixabay *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const results = await pixabay.search({ "query": q, page: 1 });
        const data = results.result;
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        reply(errt);
        console.log(e);
    }
});

// Google Image Scraper
async function googleImage(query) {
    const response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
        }
    });
    if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.text();
    const $ = cheerio.load(data);
    const pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
    const matches = $.html().matchAll(pattern);
    const decodeUrl = url => decodeURIComponent(JSON.parse(`"${url}"`));
    return [...matches].map(({ groups }) => decodeUrl(groups?.url)).filter(v => /.*\.(jpe?g|png)$/gi.test(v));
}

// Command for Google Image Search
cmd({
    pattern: "img",
    react: '🖼️',
    alias: ["image", "googleimage", "gimg"],
    desc: "Search for related pics on Google.",
    category: "download",
    use: '.gimage *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const data = await googleImage(q);
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        reply(errt);
    }
});

// Wallpaper function
async function wallpaper(query) {
    try {
        const { data } = await axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });
        const $ = cheerio.load(data);
        const result = [];
        $('#gallery > li > figure > a').each(function (a, b) {
            result.push($(b).find('img').attr('data-src'));
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Command for Wallpaper Search
cmd({
    pattern: "wallpaper",
    react: '🖼️',
    alias: ["img4", "wallp", "wp"],
    desc: "Search for related wallpapers.",
    category: "download",
    use: '.wallpaper *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const data = await wallpaper(q);
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        reply(errt);
        console.log(e);
    }
});

// Command for Pinterest
cmd({
    pattern: "pinterest",
    react: '🖼️',
    alias: ["pinterestdl"],
    desc: "Search for related pics on Pinterest.",
    category: "download",
    use: '.pinterest *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const res = await fetchJson('https://allstars-apis.vercel.app/pinterest?search=' + q);
        let data = res.data;
        if (!data) return await reply(errt);
        for (let i = 0; i < Math.min(data.length, 7); i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        reply(errt);
        console.log(e);
    }
});


// Command for Unsplash
cmd({
    pattern: "unsplash",
    react: '🖼️', 
    alias: ["unsplashdl"],
    desc: "Search for related pics on unsplash.com.",
    category: "wallpaper",
    use: '.unsplash *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const results = await unsplash.search({ "query": q, page: 1 });
        const data = results.result;
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        reply(errt);
        console.log(e);
    }
});

// Command for Pixabay
cmd({
    pattern: "pixabay",
    react: '🖼️',
    alias: ["pixabaydl"],
    desc: "Search for related pics on pixabay.com.",
    category: "wallpaper",
    use: '.pixabay *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const results = await pixabay.search({ "query": q, page: 1 });
        const data = results.result;
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        reply(errt);
        console.log(e);
    }
});

// Google Image Scraper
async function googleImage(query) {
    const response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
        }
    });
    if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.text();
    const $ = cheerio.load(data);
    const pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
    const matches = $.html().matchAll(pattern);
    const decodeUrl = url => decodeURIComponent(JSON.parse(`"${url}"`));
    return [...matches].map(({ groups }) => decodeUrl(groups?.url)).filter(v => /.*\.(jpe?g|png)$/gi.test(v));
}

// Command for Google Image Search
cmd({
    pattern: "img",
    react: '🖼️',
    alias: ["image", "googleimage", "gimg"],
    desc: "Search for related pics on Google.",
    category: "wallpaper",
    use: '.gimage *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const data = await googleImage(q);
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        reply(errt);
    }
});

// Wallpaper function
async function wallpaper(query) {
    try {
        const { data } = await axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });
        const $ = cheerio.load(data);
        const result = [];
        $('#gallery > li > figure > a').each(function (a, b) {
            result.push($(b).find('img').attr('data-src'));
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Command for Wallpaper Search
cmd({
    pattern: "wallpaper",
    react: '🖼️',
    alias: ["img4", "wallp", "wp"],
    desc: "Search for related wallpapers.",
    category: "wallpaper",
    use: '.wallpaper *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const data = await wallpaper(q);
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        reply(errt);
        console.log(e);
    }
});

// Command for Pinterest
cmd({
    pattern: "pinterest",
    react: '🖼️',
    alias: ["pinterestdl"],
    desc: "Search for related pics on Pinterest.",
    category: "wallpaper",
    use: '.pinterest *<query>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(imgmsg);
        const res = await fetchJson('https://allstars-apis.vercel.app/pinterest?search=' + q);
        let data = res.data;
        if (!data) return await reply(errt);
        for (let i = 0; i < Math.min(data.length, 7); i++) {
            await conn.sendMessage(from, { image: { url: data[i] }, caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*" }, { quoted: mek });
        }
    } catch (e) {
        reply(errt);
        console.log(e);
    }
});
