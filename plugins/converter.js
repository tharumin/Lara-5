const config = require('../config');
const { cmd } = require('../command');
const googleTTS = require("google-tts-api");
const fs = require('fs');
const fileType = require("file-type");
const path = require('path');
const { tmpdir } = require("os");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const Crypto = require("crypto");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { sticker5 } = require('../lib/sticker')
const ffmpeg = require('fluent-ffmpeg');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson} = require('../lib/functions');

//=========for cnchance================
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const FormData = require('form-data');

ffmpeg.setFfmpegPath(ffmpegPath);

const stikerWaitMsg = "*Converting.. Please Wait..*";
const imgMsg = "*Reply to a photo!*";
const descTextToSticker = "It converts your replied photo to sticker.";

const uploadFile = require('../lib/uploadFile.js')
const uploadImage = require('../lib/uploadImage.js')
cmd({
    pattern: "img2url",
    react: "🔗",
    alias: ["tourl1","imgurl1","telegraph1","imgtourl1"],
    desc: "It convert given image to url.",
    category: "convert",
    use: '.img2url *<Reply image>*',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
  let med = m.quoted ? m.quoted : m;
  let mime = (med.msg || med).mimetype || "";
  if (!mime) return reply("No media found");
  let media = await med.download();
  const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  const link = await (isTele ? uploadImage : uploadFile)(media)
     let caption = ` *🔗 Link :* ${link} 
     
> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

  await reply(caption);
} catch (e) {
  reply("*Server is busy. Try again later.!*");
  console.log(e);
}
})


async function videoToWebp(media) {
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.webp`);
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.mp4`);

    fs.writeFileSync(tmpFileIn, media);

    await new Promise((resolve, reject) => {
        ffmpeg(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec", "libwebp",
                "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse",
                "-loop", "0",
                "-ss", "00:00:00",
                "-t", "00:00:05",
                "-preset", "default",
                "-an",
                "-vsync", "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut);
    });

    const buff = fs.readFileSync(tmpFileOut);
    fs.unlinkSync(tmpFileOut);
    fs.unlinkSync(tmpFileIn);
    return buff;
}

async function fetchImage(url) {
    const response = await fetch(url);
    return await response.buffer();
}

// Command to convert text to animated sticker
cmd({
    pattern: "attp",
    react: "✨",
    alias: ["texttogif"],
    desc: "It converts a text to animated sticker.",
    category: "convert",
    use: '.attp *<your text>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return await reply(imgMsg);
    try {
        const buff = await fetchImage(`https://api.fgmods.xyz/api/maker/attp?text=${encodeURIComponent(q)}&apikey=2gw4M2yfB5`);
        await conn.sendMessage(from, { sticker: await videoToWebp(buff) }, { quoted: mek });
    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});
async function ttp(text) {
  try {
    const response = await fetch(
        "https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
            Cookie:
              "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1",
          },
          body: new URLSearchParams({
            TextToRender: text,
            FontSize: "100",
            Margin: "30",
            LayoutStyle: "0",
            TextRotation: "0",
            TextColor: "ffffff",
            TextTransparency: "0",
            OutlineThickness: "3",
            OutlineColor: "000000",
            FontName: "Lekton",
            ResultType: "view",
          }).toString(),
        },
      ),
      bodyText = await response.text(),
      $ = cheerio.load(bodyText),
      results = [];
    return (
      $('form[name="MyForm"]').each((index, formElement) => {
        const resultFile = $(formElement).find("#idResultFile").attr("value"),
          refTS = $(formElement).find("#idRefTS").attr("value");
        results.push({
          url: "https://www.picturetopeople.org" + resultFile,
          title: refTS,
        });
      }),
      results
    );
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
// Command to convert text to sticker
cmd({
    pattern: "ttp",
    react: "✨",
    alias: ["texttoimg"],
    desc: "It converts a text to sticker.",
    category: "convert",
    use: '.ttp *<your text>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return await reply(imgMsg);
    try {
        const data = m.pushname;
        const footer = config.FOOTER;
        const buff = await fetchImage(`https://api-fix.onrender.com/api/maker/ttp?text=${encodeURIComponent(q)}`);

        const sticker = new Sticker(buff, {
            pack: data,
            author: footer,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            quality: 100,
            background: "transparent",
        });

        const buffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});

async function raterian(text) {
  try {
    return `https://raterian.sirv.com/New%20Project.png?text.0.text=${text}&text.0.position.y=-35%25&text.0.color=ffffff&text.0.font.family=Poppins&text.0.font.weight=800&text.0.outline.color=000000&text.0.outline.width=1`;
  } catch (error) {
    return console.error("Error:", error), [];
  }
}

cmd({
    pattern: "raterian",
    react: "✨",
    alias: ["sraterian"],
    desc: "It converts a text to sticker.",
    category: "convert",
    use: '.raterian *<Your text>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return await reply(imgMsg);
    try {
        const data = m.pushname;
        const footer = config.FOOTER;
        const imageUrl = await raterian(q);
        if (!imageUrl) return reply('*Error fetching image!*');

        const sticker = new Sticker(imageUrl, {
            pack: data,
            author: footer,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            quality: 100,
            background: "transparent",
        });

        const buffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});

// Command to mix two emojis into a sticker
cmd({
    pattern: "imojimix",
    react: "✨",
    alias: ["im"],
    desc: "It converts two emojis to sticker.",
    category: "convert",
    use: '.imojimix *<emoji1>+<emoji2>*',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return await reply(imgMsg);
    try {
        const [emoji1, emoji2] = q.split`+`;
        const response = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
        for (const res of response.results) {
                let stiker = await sticker5(res.url, false, m.pushname, config.FOOTER)
                await conn.sendFile(from, stiker, 'sticker.webp', '', mek)
        }
    } catch (e) {
        console.error(e);
    }
});

// Command to convert image or video to sticker

var imgmsg = "*Reply to a photo !*"
var descg = "It converts your replied photo to sticker."
cmd({
    pattern: "sticker",
    react: "🔮",
    alias: ["s","take"],
    desc: descg,
    category: "convert",
    use: '.sticker <Reply to image>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    const isQuotedVideo = m.quoted ? ((m.quoted.type === 'videoMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'videoMessage') : false)) : false
    const isQuotedSticker = m.quoted ? (m.quoted.type === 'stickerMessage') : false
    const data = q.split("|")[0]  || pushname
    const datas = q.split("|")[1]  || ''
     if ((m.type === 'imageMessage') || isQuotedImage) {
      var nameJpg = getRandom('')
      isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
    let sticker = new Sticker(nameJpg + '.jpg', {
      pack: data, // The pack name
      author: datas, // The author name
      type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
      categories: ["🤩", "🎉"], // The sticker category
      id: "12345", // The sticker id
      quality: 100, // The quality of the output file
      background: "transparent", // The sticker background color (only for full stickers)
  });
  const buffer = await sticker.toBuffer();
  return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
         
}  else if ( isQuotedSticker ) { 

    var nameWebp = getRandom('')
    await m.quoted.download(nameWebp)
  let sticker = new Sticker(nameWebp + '.webp', {
    pack: data, // The pack name
    author: datas, // The author name
    type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
    categories: ["🤩", "🎉"], // The sticker category
    id: "12345", // The sticker id
    quality: 100, // The quality of the output file
    background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
    
}  else if ( isQuotedSticker ) { 
    var namevid = getRandom('')
    await m.quoted.download(nameWebp)
  let sticker = new Sticker(namevid + '.mp4', {
    pack: data, // The pack name
    author: datas, // The author name
    type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
    categories: ["🤩", "🎉"], // The sticker category
    id: "12345", // The sticker id
    quality: 100, // The quality of the output file
    background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
} else return await reply(imgmsg)
} catch (e) {
reply('*Error !!*')
l(e)
}
})

// Function to convert video to audio
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3')
}

function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}

// Command to convert video to audio
cmd({
    pattern: "toptt",
    react: "🔊",
    alias: ["tovn", "tovoicenote"],
    desc: "It converts your replied video to audio [mp3].",
    category: "convert",
    use: '.toptt *<Reply to video>*',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    if (!m.quoted || m.quoted.type !== 'videoMessage') return await reply("*Reply to a video!*");
    try {
        let media = await m.quoted.download();
        let audio = await toPTT(media);
        await conn.sendMessage(m.chat, { audio: auddio.options, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});

// Command to convert video to mp3
cmd({
    pattern: "tomp3",
    react: "🔊",
    alias: ["toaudio", "toaud"],
    desc: "It converts your replied video to audio [mp3].",
    category: "convert",
    use: '.tomp3 *<Reply to video>*',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    if (!m.quoted || m.quoted.type !== 'videoMessage') return await reply("*Reply to a video!*");
    try {
        let media = await m.quoted.download();
        let audio = await toAudio(media);
        await conn.sendMessage(m.chat, { audio: auddio.options, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});

// Command to convert sticker to image
cmd({
    pattern: "toimage",
    react: "🔮",
    alias: ["toimg", "tojpg"],
    desc: "It converts your replied sticker to image.",
    category: "convert",
    use: '.toimage *<Reply to sticker>*',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const isQuotedSticker = m.quoted && m.quoted.type === 'stickerMessage';
    if (!isQuotedSticker) return await reply("*Reply to a sticker!*");
    
    try {
        let buff = await m.quoted.download();
        const type = await fileType.fromBuffer(buff);
        await fs.promises.writeFile(`./${type.ext}`, buff);
        await conn.sendMessage(from, { image: fs.readFileSync(`./${type.ext}`), caption: config.FOOTER }, { quoted: mek });
    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});

async function processing(imageBuffer, endpoint) {
 try {
  const FormData = require("form-data");
  return new Promise(async (resolve, reject) => {
   const form = new FormData();
   const scheme = `https://inferenceengine.vyro.ai/${endpoint}`;
   form.append("model_version", 1, {
    "Content-Transfer-Encoding": "binary",
    contentType: "multipart/form-data; charset=utf-8",
   });
   form.append("image", Buffer.from(imageBuffer), {
    filename: `${endpoint}.jpg`,
    contentType: "image/jpeg",
   });
   form.submit(
    {
     url: scheme,
     host: "inferenceengine.vyro.ai",
     path: `/${endpoint}`,
     protocol: "https:",
     headers: {
      "User-Agent": "okhttp/4.9.3",
      Connection: "Keep-Alive",
      "Accept-Encoding": "gzip",
     },
    },
    function (err, res) {
     if (err) {
      reject(err);
     }
     let chunks = [];
     res
      .on("data", function (chunk) {
       chunks.push(chunk);
      })
      .on("end", () => {
       resolve(Buffer.concat(chunks));
      })
      .on("error", (error) => {
       reject(error);
      });
    }
   );
  });
 } catch (error) {
  console.log(error);
  return imageBuffer;
 }
}

const imageProcessingCommand = (pattern, desc, use, processType) => {
    return cmd({
        pattern: pattern,
        react: "🔮",
        desc: desc,
        category: "convert",
        use: use,
        filename: __filename
    }, async (conn, mek, m, { from, quoted }) => {
        try {
            const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage'));
            if (m.type === 'imageMessage' || isQuotedImage) {
                let buff = isQuotedImage ? await m.quoted.download() : await m.download();
                const enhancedImage = await processing(buff, processType);
                await conn.sendMessage(from, { image: enhancedImage, caption: config.FOOTER }, { quoted: mek });
            } else {
                return reply("*Reply to a photo!*");
            }
        } catch (e) {
            reply("*Server is busy. Try again later!*");
            console.log(e);
        }
    });
};

imageProcessingCommand("enhance", "Convert low-quality image to high-quality.", '.enhance *<reply low quality image>*', 'enhance');
imageProcessingCommand("dehaze", "Remove haze from the given image.", '.dehaze *<reply to image>*', 'dehaze');
imageProcessingCommand("recolor", "Enhance color in the given image.", '.recolor *<reply low colored image>*', 'recolor');

cmd({
    pattern: "tts",
    react: "🔊",
    desc: "Text to Speech",
    category: "convert",
    filename: __filename,
    use: '.tts *<Your Text>*',
},
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return m.reply("⚠️ *Please provide a sentence to convert to audio.*");

        const ttsurl = googleTTS.getAudioUrl(q, {
            lang: "en",
            slow: false,
            host: "https://translate.google.com",
        });

        return conn.sendMessage(m.chat, {
            audio: {
                url: ttsurl,
            },
            mimetype: "audio/mpeg",
            fileName: `ttsAudio.m4a`,
        }, {
            quoted: mek,
        });

    } catch (e) {
        console.error(e);
        return reply("❌ *An error occurred while processing your request!*");
    }
});

cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "Translate text between languages",
    react: "🔮",
    category: "convert",
    use: '.trt *<language_code>,<text>*',
    filename: __filename
},
async (conn, mek, m, { q, reply }) => {
    try {
        const args = q.split(',');
        if (args.length < 2) {
            return reply("❗ *Please provide a language code and text.*\nUsage: `.trt [language_code] [text]`");
        }

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
*🎰 SUHAS-MD Translator.*

◈ *Original*: ${textToTranslate}
◈ *Translated*: ${translation}
◈ *Language*: ${targetLang.toUpperCase()}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

        return reply(translationMessage);
    } catch (e) {
        console.error(e);
        return reply("⚠️ *An error occurred while translating the text. Please try again later.*");
    }
});

//emoji mix in this


cmd({
    pattern: "emojimix",
    desc: "Create a mix of two emojis as a sticker.",
    react: "🤩",
    category: "convert",
    filename: __filename,
}, async (conn, mek, m, { args, reply, from, senderNumber, pushname }) => {
    if (!args[0] || args.length !== 1) {
        reply("Incorrect usage. Example: .emojimix 😀+🌝");
        return;
    }

    // Split the input into two emojis using ';' as a separator
    const emojis = args.join(' ').split('+');

    if (emojis.length !== 2) {
        reply("Please specify two emojis using a '+' as a separator.");
        return;
    }

    const emoji1 = emojis[0].trim();
    const emoji2 = emojis[1].trim();

    try {
        // Ensure the URL string is wrapped in quotes
        const response = await fetchJson(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

        if (response.status === true) {
            // If the request is successful, create and send the sticker
            let sticker = new Sticker(response.result, {
                pack: pushname, // The pack name
                author: '', // The author name
                type: StickerTypes.CROPPED, // Ensure to use the correct sticker type
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id (you can change this)
                quality: 75, // The quality of the output file
                background: "transparent", // The sticker background color
            });

            // Convert sticker to buffer
            const buffer = await sticker.toBuffer();

            // Send the sticker as a message
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        } else {
            reply("Unable to create emoji mix.");
        }
    } catch (error) {
        reply("An error occurred while creating the emoji mix: " + error.message);
    }
});