const crypto = require('crypto');
const axios = require('axios');
const { cmd, commands } = require('../command');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { igdl } = require('ruhend-scraper');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "fancy",
    alias: ["textstyle"],
    react: '🫧',
    desc: 'get fancy texts.',
    category: "convert",
    use: '.fancy <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me Query.❗")

const fetchData = await axios.get('https://www.dark-yasiya-api.site/other/font?text=' + q)
  const data = fetchData?.data?.result
    let msg = `- Fancy Text -\n\n\n`
     for (let j = 0 ; j < data.length; j++) {
       msg += `${( j + 1)}. ${data[j].name}\n${data[j].result}\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`
    }
       

await conn.sendMessage(m.chat, { text: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply('Error')
}
})

cmd({
    pattern: "readmore",
    desc: "Readmore message",
    category: "convert",
    react: "📝",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender
}) => {
    try {
        // Get the message text after the command (.readmore text)
        let readmoreText = q ? q : "No text provided";

        // Create the "Readmore" effect by adding a special character to split the text
        let readmore = "\u200B".repeat(4000); // This creates a large gap between text

        // Full message to send
        let replyText = `... Readmore\n\n${readmore}${readmoreText}`;

        // Send the message with the "Readmore" functionality
        await conn.sendMessage(from, { text: replyText }, { quoted: mek });

        // React to the message
        await conn.sendMessage(from, { react: { text: "", key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "gpass",
    desc: "Generate a strong password.",
    category: "others",
    react: "🔐",
    use: '.gpass',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const length = args[0] ? parseInt(args[0]) : 12; // Default length is 12 if not provided
        if (isNaN(length) || length < 8) {
            return reply('Please provide a valid length for the password (minimum 8 characters).');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `🔐 *Your Strong Password* 🔐\n\nPlease find your generated password below:\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

        // Send initial notification message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Send the password in a separate message
        await conn.sendMessage(from, { text: password }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error generating password: ${e.message}`);
    }
});

cmd({
    pattern: "srepo",
    desc: "Fetch Information About a GitHub Repository.",
    category: "others",
    react: "📁",
    use: '.srepo <link>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const repo = args.join(' ');
        if (!repo) {
            return reply("Please provide a GitHub repository name in the format `owner/repo`.");
        }

        const apiUrl = `https://api.github.com/repos/${repo}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let repoInfo = `📁_*GitHub Repository Info*_📁\n\n`;
        repoInfo += `📌 *Name*: ${data.name}\n`;
        repoInfo += `🔗 *URL*: ${data.html_url}\n`;
        repoInfo += `📝 *Description*: ${data.description}\n`;
        repoInfo += `⭐ *Stars*: ${data.stargazers_count}\n`;
        repoInfo += `🍴 *Forks*: ${data.forks_count}\n`;
        repoInfo += `\n`;
        repoInfo += `> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

        await conn.sendMessage(from, { text: repoInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching repository info: ${e.message}`);
    }
});

cmd({
    pattern: "weather",
    desc: "Get weather information for a location",
    react: "🌤",
    category: "others",
    use: '.weather1 <location>',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please Provide a City/Town/Country Name.❗");

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const weather = `
🌍 *SUHAS-MD Weather Information for ${data.name}, ${data.sys.country}* 🌍

🌡️ *Temperature*: ${data.main.temp}°C
🌡️ *Feels Like*: ${data.main.feels_like}°C
🌡️ *Min Temp*: ${data.main.temp_min}°C
🌡️ *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
`;

        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});

cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "others",
    react: "🖥️",
    use: '.githubstalk <link>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.❗");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `*💫 SUHAS-MD GitHubStalk Info.💫*
        
👤 *Username*: ${data.name || data.login}
🔗 *Github Url*:(${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
`;

        await conn.sendMessage(from, { image: { url: data.avatar_url }, caption: userInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data: ${e.response ? e.response.data.message : e.message}`);
    }
});



cmd({
    pattern: "instagram",
    alias: ["ig"],
    desc: "To download instagram videos.",
    react: "📥",
    category: "download",
    use: '.instagram <link>',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if (!args[0]) {
    return reply('*Please give a waild Instagram link.❗*');
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return reply('*`Error obtaining data.`*');
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return reply('*`No result found.`*');
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return reply('*`Error data loss.`*');
  }

  if (!data) {
    return reply('*`No data found.`*');
  }

  await m.react('✅');
  let video = data.url;
  let dev = '> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*'
  
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'ig.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return reply('*`Error download video.`*');
  await m.react('❌');
  }
}catch(e){
console.log(e)
  reply(`${e}`)
}
});

cmd({
    pattern: "news",
    desc: "Get the Latest News Headlines.",
    category: "news",
    react: "📰",
    use: '.news',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiKey="0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles.length) return reply("No news articles found.");

        // Send each article as a separate message with image and title
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
*SUHAS-MD News Center.📰*         
            
📰 *${article.title}*
⚠️ _${article.description}_
🔗 _${article.url}_

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳* 
            `;

            console.log('Article URL:', article.urlToImage); // Log image URL for debugging

            if (article.urlToImage) {
                // Send image with caption
                await conn.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                // Send text message if no image is available
                await conn.sendMessage(from, { text: message });
            }
        };
    } catch (e) {
        console.error("Error fetching news:", e);
        reply("Could not fetch news. Please try again later.");
    }
});

cmd({
    pattern: "translate",
    alias: ["trt"],
    desc: "🌍 Translate Text Between Languages",
    react: "🌐",
    category: "convert",
    use: '.translate <text>',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("Please provide a language code and text.❗");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *SUHAS-MD Translation* 🌍

🔤 *Original*: ${textToTranslate}
🔠 *Translated*: ${translation}
🌐 *Language*: ${targetLang.toUpperCase()}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while translating the text. Please try again later.");
    }
});

cmd({
    pattern: "fact",
    desc: "🧠 Get a random fun fact",
    react: "🤓",
    category: "fun",
    use: '.fact',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';  // API for random facts
        const response = await axios.get(url);
        const fact = response.data.text;

        const funFact = `
🧠 *Random Fun Fact* 🧠

${fact}

Isn't that interesting? 😄

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
`;

        return reply(funFact);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
    }
});


cmd({
    pattern: "dog",
    desc: "Fetch a random dog image.",
    category: "wallpaper",
    react: "🐶",
    use: '.dog',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://dog.ceo/api/breeds/image/random`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.message }, caption: '🐶 *SUHAS-MD Random Dog Image* 🐶\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching dog image: ${e.message}`);
    }
});

cmd({
    pattern: "rvideo",
    desc: "Fetch and send a random video from Pexels.",
    category: "fun",
    react: "🎥",
    use: '.rvideo',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Notify user that the video is being downloaded
        await conn.sendMessage(from, { text: '> ⏳ *Waiting, Your Video is Downloading...* ⏳' }, { quoted: mek });

        const apiUrl = `https://api.pexels.com/videos/search?query=random&per_page=1&page=${Math.floor(Math.random() * 100) + 1}`;
        const response = await axios.get(apiUrl, { headers: { Authorization: config.PEXELS_API_KEY } });

        const video = response.data.videos[0];
        if (!video || !video.video_files || video.video_files.length === 0) {
            throw new Error('No video files found in the response');
        }

        const videoUrl = video.video_files[0].link;
        const videoTitle = video.title || 'Random Video';

        // Download the video
        const videoPath = path.join(__dirname, 'tempVideo.mp4');
        const writer = fs.createWriteStream(videoPath);

        const responseVideo = await axios.get(videoUrl, { responseType: 'stream' });
        responseVideo.data.pipe(writer);

        writer.on('finish', async () => {
            await conn.sendMessage(from, { text: '✅ *Your video has been successfully downloaded!* ✅' }, { quoted: mek });
            await conn.sendMessage(from, { video: { url: videoPath }, caption: `🎥 *Random Pexels Video* 🎥\n\nTitle: ${videoTitle}\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*` }, { quoted: mek });

            // Clean up
            fs.unlinkSync(videoPath);
        });

        writer.on('error', (err) => {
            console.log(err);
            reply(`❌ Error downloading video: ${err.message}`);
        });
    } catch (e) {
        console.log(e);
        reply(`❌ Error fetching video: ${e.message}`);
    }
});

cmd({
    pattern: "quote",
    desc: "Get a random inspiring quote.",
    category: "fun",
    react: "💬",
    use: '.fun',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data;
        const message = `
💬 "${quote.content}"
- ${quote.author}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
        `;
        return reply(message);
    } catch (e) {
        console.error("Error fetching quote:", e);
        reply("Could not fetch a quote. Please try again later.");
    }
});



cmd({
    pattern: "mvinfo",
    desc: "Fetch details information about a movie.",
    category: "movie",
    react: "🎬",
    use: '.mvinfo <name>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=76cb7f39`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
🎬 *SUHAS-MD MOVIE INFORMATION* 🎬

🎥 *Title:* ${data.Title}
📅 *Year:* ${data.Year}
🌟 *Rated:* ${data.Rated}
📆 *Released:* ${data.Released}
⏳ *Runtime:* ${data.Runtime}
🎭 *Genre:* ${data.Genre}
🎬 *Director:* ${data.Director}
✍️ *Writer:* ${data.Writer}
🎭 *Actors:* ${data.Actors}
📝 *Plot:* ${data.Plot}
🌍 *Language:* ${data.Language}
🇺🇸 *Country:* ${data.Country}
🏆 *Awards:* ${data.Awards}
⭐ *IMDB Rating:* ${data.imdbRating}
🗳️ *IMDB Votes:* ${data.imdbVotes}
`;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        // Send the movie information along with the poster image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    use: '.shutdown',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 SUHAS-MD is Shutting Down...").then(() => process.exit());
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    use: '.broadcast',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");

    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    reply("📢 Message broadcasted to all groups.");
});

// 3. Set Profile Picture
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    use: '.setpp',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");

    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

// 4. Block User
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    use: '.block',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to block.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User ${user} blocked successfully.`);
    } catch (error) {
        reply(`❌ Error blocking user: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    use: '.unblock',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});

// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    use: '.clearchats',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

// 7. Get Bot JID
cmd({
    pattern: "jid",
    desc: "Get the bot's JID.",
    category: "owner",
    react: "🤖",
    use: '.jid',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply(`🤖 *Bot JID:* ${conn.user.jid}`);
});

// 8. Group JIDs List
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    use: '.gjid',
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
});

cmd({
    pattern: "convert",
    desc: "Convert an amount from one currency to another.",
    category: "convert",
    react: "💱",
    use: '.convert',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length < 3) {
            return reply("Usage: .convert <amount> <from_currency> <to_currency>");
        }

        const amount = args[0];
        const fromCurrency = args[1].toUpperCase();
        const toCurrency = args[2].toUpperCase();

        if (isNaN(amount)) {
            return reply("Please provide a valid amount.");
        }

        const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.rates[toCurrency]) {
            return reply(`Conversion rate for ${toCurrency} not found.`);
        }

        const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
        let conversionInfo = `💸_*Currency Conversion*_💸\n\n`;
        conversionInfo += `💵 *Amount*: ${amount} ${fromCurrency}\n`;
        conversionInfo += `🔄 *Converted Amount*: ${convertedAmount} ${toCurrency}\n`;
        conversionInfo += `📈 *Exchange Rate*: 1 ${fromCurrency} = ${data.rates[toCurrency]} ${toCurrency}\n
        
> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*
        `;

        await conn.sendMessage(from, { text: conversionInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data: ${e.message}`);
    }
});

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "💀",
    use: '.hack',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            '💻 *SUHAS-MD HACK STARTING...* 💻',
            '',
            '*SUHAS-MD Initializing hacking tools...* 🛠️',
            '*SUHAS-MD Connecting to remote servers...* 🌐',
            '',
            '```[█] 10%``` ⏳'                                            ,
            '```[██] 20%``` ⏳'                                   ,
            '```[███] 30%``` ⏳'                               ,
            '```[████] 40%``` ⏳'                            ,
            '```[█████] 50%``` ⏳'                       ,
            '```[██████] 60%``` ⏳'                 ,
            '```[███████] 70%``` ⏳'            ,
            '```[████████] 80%``` ⏳'        ,
            '```[█████████] 90%``` ⏳'    ,
            '```[██████████] 100%``` ✅',
            '',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Command Execution: Complete!* 🎯',
            '',
            '*📡 Transmitting data...* 📤',
            '_🕵️‍♂️ Ensuring stealth..._ 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '',
            '⚠️ *Note:* All actions are for demonstration purposes only.',
            '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
            '',
            '✨ 𝗦𝗨𝗛𝗔𝗦-𝗠𝗗 🤍-HACKING-COMPLETE ☠️❕*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "joke",
    desc: "Get a random joke",
    react: "🤣",
    category: "fun",
    use: '.joke',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;

        const jokeMessage = `
😂 *Here's a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ Couldn't fetch a joke right now. Please try again later.");
    }
});

cmd({
                             pattern: "define",
                             desc: "📚 Get the definition of a word",
                             react: "🔍",
                             category: "other",
                             filename: __filename
                         },
                         async (conn, mek, m, { from, q, reply }) => {
                             try {
                                 if (!q) return reply("❗ Please provide a word to define. Usage: .define [word]");

                                 const word = q;
                                 const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

                                 const response = await axios.get(url);
                                 const definitionData = response.data[0];

                                 const definition = definitionData.meanings[0].definitions[0].definition;
                                 const example = definitionData.meanings[0].definitions[0].example || 'No example available';
                                 const synonyms = definitionData.meanings[0].definitions[0].synonyms.join(', ') || 'No synonyms available';

const wordInfo = `
📚 *Word*: ${definitionData.word}
🔍 *Definition*: ${definition}
📝 *Example*: ${example}
🔗 *Synonyms*: ${synonyms}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

                                 return reply(wordInfo);
                             } catch (e) {
                                 console.log(e);
                                 if (e.response && e.response.status === 404) {
                                     return reply("🚫 Word not found. Please check the spelling and try again.");
                                 }
                                 return reply("⚠️ An error occurred while fetching the definition. Please try again later.");
                             }
                         });


//direct donwload in this

cmd({
    pattern: "download",
    react: "📥",
    alias: ["dlurl"],
    desc: "Direct link uploader",
    category: "download",
    use: '.download <link>',
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, args, q, reply 
}) => {
    try {
        if (!q) return reply('Please provide a link.❗');
        
        // Validate URL format
        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        };

        if (!isValidUrl(q)) return reply('❌ Invalid URL format! Please check the link.');

        // Fetch the file data from the provided link
        const axios = require('axios');
        const mimeTypes = require('mime-types');
        
        const res = await axios.get(q, { 
            responseType: 'arraybuffer',
            timeout: 15000 // Set a timeout of 15 seconds
        });

        // Get MIME type and extension
        const mime = res.headers['content-type'] || 'application/octet-stream';
        const extension = mimeTypes.extension(mime) || 'unknown';

        // Get file size from headers
        const fileSize = res.headers['content-length'] || 0;
        const maxFileSize = 2048 * 2048 * 2048; // 10 MB

        if (fileSize > maxFileSize) {
            return reply('❗ File is too large to upload (limit: 10MB).');
        }

        // Define file name
        const fileName = `S U H A S  -  M D 🇱🇰.${extension}`;

        // Send the file as a document
        await conn.sendMessage(
            from,
            {
                document: { url: q },
                caption: "> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*",
                mimetype: mime,
                fileName: fileName
            },
            { quoted: mek }
        );

    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        reply(`❌ Error: ${error.message}`);
    }
});
