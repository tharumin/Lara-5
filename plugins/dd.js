const config = require("../config");
const { cmd } = require("../command");
const { File } = require("megajs");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const apkdl = require('../lib/apkdl');
const { sizeFormatter} = require('human-readable')
const ufs = require('../lib/ufs');
let newsize = config.MAX_SIZE * 1024 * 1024

const N_FOUND = "*I couldn't find anything :(*";
const urlNeed = "*It downloads apps from Play Store.*";
const imgMsg = "*Please write a few words.❗*";

cmd(
  {
    pattern: "apk",
    react: "📦",
    alias: ["app", "playstore"],
    desc: urlNeed,
    category: "download",
    use: ".apk *<Apk Name>*",
    filename: __filename,
  },
  async (conn, mek, m, { from, prefix, q, reply }) => {
    try {
      if (!q) return await reply(imgMsg, mek);
      const data = await apkdl.search(q);
      if (!data.length) return await reply(N_FOUND, mek);

      const rows = data.map(v => ({
        buttonId: `${prefix}dapk ${v.id}`,
        buttonText: { displayText: `${v.name}` },
        type: 1,
      }));

      const buttonMessage = {
        image: "https://cdn6.aptoide.com/imgs/4/8/c/48c1f18f7d65f38d0b19af5f47015e9c_fgraphic.jpg",
        caption: `*SUHAS-MD APK Downloader.📦*`,
        footer: config.FOOTER,
        buttons: rows,
        headerType: 4,
      };

      return await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      console.error(e);
      reply("*ERROR !!*");
    }
  }
);

cmd(
  {
    pattern: "dlapk",
      desc: "Download Direct Apps",
    react: "📦",
    category: "download",
    use: "Download Apps in Playstore or Appstore",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      await conn.sendMessage(from, { react: { text: "🌟", key: mek.key } });
      if (!q) return await reply("*Need apk link...❗*", mek);

      const data = await apkdl.download(q);
      const caption = `📥 *SUHAS-MD APK Downloader* 📥\n\n` +
        `◈ *🏷️  :* ${data.name}\n` +
        `◈ *👤 Developers :* ${data.package}\n` +
        `◈ *📆 Last Update :* ${data.lastup}\n` +
        `◈ *📥 Size :* ${data.size}\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

      await conn.sendMessage(from, { image: { url: data.icon }, caption }, { quoted: mek });

let sizeb = await ufs(data.dllink);
if (sizeb > newsize) return await conn.sendMessage(from , { text: '*File size is too big...⁉️*' }, { quoted: mek } )

      await conn.sendMessage(from, {
        document: { url: data.dllink },
        mimetype: "application/vnd.android.package-archive",
        fileName: `${data.name}.apk`,
        caption: config.FOOTER,
      }, { quoted: mek });
      
      await conn.sendMessage(from, { react: { text: "✔", key: mek.key } });
    } catch (e) {
      console.error(e);
      reply(`_An Error Found_ : *${e}*`);
    }
  }
);

cmd(
  {
    pattern: "mega",
    react: "📦",
    alias: ["megadl", "meganz"],
    desc: urlNeed,
    category: "download",
    use: ".mega *<Mega Url>*",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    if (!q) return await reply("*Please provide a mega.nz URL.❗*");

    try {
      const file = File.fromURL(q);
      await file.loadAttributes();

      if (file.size >= config.MAX_SIZE * 1024 * 1024) {
        return await reply(`File size exceeded...\nMaximum Upload Size Is ${config.MAX_SIZE} MB`);
      }

      const caption = `
*SUHAS-MD Mega File Downloader.📦*
*◈ File:* ${file.name}
*◈ Size:* ${formatBytes(file.size)}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

      const data = await file.downloadBuffer();
      const fileExtension = path.extname(file.name).toLowerCase();
      const mimeTypes = {
        ".mp4": "video/mp4",
        ".pdf": "application/pdf",
        ".zip": "application/zip",
        ".rar": "application/x-rar-compressed",
        ".7z": "application/x-7z-compressed",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
      };

      const mimetype = mimeTypes[fileExtension] || "application/octet-stream";

      await conn.sendFile(m.chat, data, file.name, caption, m, null, {
        mimetype,
        asDocument: true,
      });
      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  }
);

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function mfire(url) {
  try {
    const response = await fetch(`https://www-mediafire-com.translate.goog/${url.replace("https://www.mediafire.com/", "")}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.178 Safari/537.36",
      },
    });

    const data = await response.text();
    const $ = cheerio.load(data);
    const downloadUrl = ($("#downloadButton").attr("href") || "").trim();
    const alternativeUrl = ($("#download_link > a.retry").attr("href") || "").trim();
    const $intro = $("div.dl-info > div.intro");

    return {
      link: downloadUrl || alternativeUrl,
      name: $intro.find("div.filename").text().trim(),
      size: $intro.find("div.filetype > span").eq(0).text().trim(),
      uploaded: $("div.dl-info > ul.details > li").eq(1).find("span").text().trim(),
      mime: /\(\.(.*?)\)/.exec($intro.find("div.filetype > span").eq(1).text())?.[1]?.trim() || "bin",
    };
  } catch (error) {
    console.error(error);
  }
}

cmd(
  {
    pattern: "mediafire",
    alias: ["mfire"],
    react: "📁",
    desc: "Download mediafire files.",
    category: "download",
    use: ".mediafire *<Mediafire Url>*",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      const res = await mfire(q);
      const sendmedia = res.link || res.alternativeUrl;
      const caption = `*SUHAS-MD MediaFire Downloader.📦*\n*◈ Name:* ${res.name}\n*◈ Size:* ${res.size}\n*◈ Mimetype:* ${res.mime}\n*◈ Uploaded:* ${res.uploaded}\n\n\n> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

      await reply(caption);
      if (parseFloat(res.size) > config.MAX_SIZE) {
        return await reply("*This file is too big.⁉️*");
      }

      await conn.sendMessage(from, {
        document: { url: sendmedia },
        mimetype: res.filetype,
        fileName: `${res.name}.${res.mime}`,
        caption: config.FOOTER,
      }, { quoted: mek });
    } catch (e) {
      console.error(e);
      await reply(`*Error:* ${e}`);
    }
  }
);

cmd(
  {
    pattern: "gitclone",
    alias: ["gitdl"],
    react: "📁",
    desc: "Download git repos",
    category: "download",
    use: ".gitclone *<Git Repo Url>*",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      if (!q) return await reply("🩸*Please provide a GitHub repo URL !!*");
      const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
      if (!regex.test(q)) return reply("🩸*Please provide a valid GitHub repo link !!*");

      const [, user, repo] = q.match(regex) || [];
      const url = `https://api.github.com/repos/${user}/${repo.replace(/.git$/, "")}/zipball`;
      const filename = (await fetch(url, { method: "HEAD" })).headers
        .get("content-disposition")
        .match(/attachment; filename=(.*)/)[1];

      await conn.sendMessage(from, {
        document: { url },
        mimetype: "application/zip",
        fileName: filename,
        caption: config.FOOTER,
      }, { quoted: mek });
    } catch (e) {
      console.error(e);
      reply("*I can't find this repo.⁉️*");
    }
  }
);

cmd(
  {
    pattern: "fetch",
    react: "📁",
    desc: "Download git repos",
    category: "download",
    use: ".fetch *<Git Repo Url>*",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    if (!q) return await reply("*Please provide a direct URL!*");

    try {
      const [data, datas] = q.split("±");
      const mediaUrl = data.trim();
      const response = await axios.get(mediaUrl, { responseType: "arraybuffer" });
      const mediaBuffer = Buffer.from(response.data, "binary");
      const mimeType = response.headers["content-type"] || "application/octet-stream";
      const fileExtension = path.extname(mediaUrl) || "bin";
      const fileName = `${datas || "downloaded_file"}.${fileExtension}`;

      await conn.sendMessage(from, {
        document: mediaBuffer,
        mimetype: mimeType,
        fileName: fileName,
      }, { quoted: mek });

      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (error) {
      console.error("Error fetching or sending", error);
      await conn.sendMessage(from, "*Error fetching or sending*", { quoted: mek });
    }
  }
);

cmd(
  {
    pattern: "fetchmp4",
    react: "🎞️",
    desc: "Download Fetchmp4",
    category: "download",
    use: ".fetchmp4 *<Text>*",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    if (!q) return await reply("*Please provide a direct URL!*");

    try {
      const [data, datas] = q.split("±");
      const response = await axios.get(data.trim(), { responseType: "arraybuffer" });
      const mediaBuffer = Buffer.from(response.data, "binary");

      await conn.sendMessage(from, {
        document: mediaBuffer,
        mimetype: "video/mp4",
        fileName: `${datas || "downloaded_video"}.mp4`,
      }, { quoted: mek });

      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (error) {
      console.error("Error fetching or sending", error);
      await conn.sendMessage(from, "*Error fetching or sending*", { quoted: mek });
    }
  }
);

cmd(
  {
    pattern: "ss",
    alias: ["screenshot"],
    use: ".ss *<Website URL>*",
    react: "📸",
    desc: "Get screenshots of websites",
    category: "download",
    filename: __filename,
  },
  async (conn, mek, m, { from, prefix, q, reply }) => {
    try {
      if (!q) return reply("*Please provide a website URL.❗*");

      const msg = "*Reply The Below Number:*";
      const buttons = [
        { buttonId: `${prefix}sstab ${q}`, buttonText: { displayText: "◈ Tablet Screenshot" }, type: 1 },
        { buttonId: `${prefix}sspc ${q}`, buttonText: { displayText: "◈ Desktop Screenshot" }, type: 1 },
        { buttonId: `${prefix}ssphone ${q}`, buttonText: { displayText: "◈ Phone Screenshot" }, type: 1 },
        { buttonId: `${prefix}fullss ${q}`, buttonText: { displayText: "◈ Full Screenshot" }, type: 1 },
      ];

      const buttonMessage = {
        image: `https://static.vecteezy.com/system/resources/previews/009/896/469/original/screen-shot-symbol-for-app-icon-or-company-logo-cut-out-style-version-1-vector.jpg`,
        caption: msg,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };

      await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      console.error(e);
      reply("🩸 *I can't get a screenshot. Try again later.*");
    }
  }
);

const createScreenshotCommand = (pattern, width, height) => {
  cmd(
    {
      pattern: pattern,
      react: "💫",
      dontAddCommandList: true,
      filename: __filename,
    },
    async (conn, mek, m, { from, q, reply }) => {
      try {
        if (!q) return reply("🩸 *Please provide a URL!*");
        const ss = await (await fetch(`https://pptr.io/api/screenshot?width=${width}&height=${height}&deviceScaleFactor=1&dark=1&url=${q}`)).buffer();
        conn.sendFile(m.chat, ss, "", config.FOOTER, m);
      } catch (e) {
        console.error(e);
        reply("🩸 *I can't get a screenshot. Try again later.*");
      }
    }
  );
};

createScreenshotCommand("sspc", 1920, 1080); // Desktop
createScreenshotCommand("ssphone", 1440, 2560); // Phone
createScreenshotCommand("sstab", 1280, 800); // Tablet

cmd(
  {
    pattern: "fullss",
    react: "💫",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("🩸 *Please provide a URL!*");
      const ss = await (await fetch(`https://webss.yasirweb.eu.org/api/screenshot?resX=1280&resY=900&outFormat=jpg&waitTime=1000&isFullPage=true&dismissModals=false&url=${q}`)).buffer();
      conn.sendFile(m.chat, ss, "", config.FOOTER, m);
    } catch (e) {
      console.error(e);
      reply("🩸 *I can't get a screenshot. Try again later.*");
    }
  }
);


//=======gdrive====

const formatSize = sizeFormatter({
  std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`});

async function GDriveDl(url) {
  let id, res = {
    error: !0
  };
  //if (!url || !url.match(/
  if (!url || !url.match(/drive\.google/i)) return res;
  try {
    if (id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1], !id) throw "ID Not Found";
    res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
      method: "post",
      headers: {
        "accept-encoding": "gzip, deflate, br",
        "content-length": 0,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        origin: "https://drive.google.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
        "x-drive-first-party": "DriveWebUi",
        "x-json-requested": "true"
      }
    });
    let {
      fileName,
      sizeBytes,
      downloadUrl
    } = JSON.parse((await res.text()).slice(4));
    if (!downloadUrl) throw "Link Download Limit!";
    let data = await fetch(downloadUrl);
    return 200 !== data.status ? data.statusText : {
      downloadUrl: downloadUrl,
      fileName: fileName,
      fileSize: formatSize(sizeBytes),
      fileSizeb: sizeBytes,
      mimetype: data.headers.get("content-type")
    };
  } catch (e) {
    return console.log(e), res;
  }
}

cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    react: '📁',
    desc: "Download googledrive files.",
    category: "download",
    use: '.gdrive *<GoogleDrive Url>*',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const [data, image] = q.split("±")
if (!data) return await  reply('*Please give me googledrive url !!*')   
let res = await GDriveDl(data)
let mimetype = ''
if (res.fileName.includes('mkv')) {
        mimetype = 'video/x-matroska';
} else {
        mimetype = res.mimetype
}
const response = await axios.get(res.downloadUrl , { responseType: "arraybuffer" });
const mediaBuffer = Buffer.from(response.data, "binary");
let capa = `*◈ File name:*  ${res.fileName}
*◈ File Size:* ${res.fileSize}
*◈ File type:* ${mimetype}

${config.FOOTER}`
if (res.fileSizeb > newsize) return await conn.sendMessage(from , { text: '🚩 *File size is too big...*' }, { quoted: mek } )
        const message = {
            document:  mediaBuffer,
            mimetype: mimetype,
            fileName: res.fileName,
            caption: capa,
        };
        await conn.sendMessage(from, message, { quoted: mek });
//await conn.sendMessage(from, { document: mediaBuffer, fileName: res.fileName, caption: capa, jpegThumbnail: img, mimetype: res.mimetype }, { quoted: mek })
} catch (e) {
console.log(e)
reply(`${e}`)
}
})

//forward in this 


const forwardCommand = {
    pattern: "forward",
    react: "💚",
    desc: "Forward messages",
    alias: ['fo'],
    category: "owner",
    use: ".forward <Jid address>",
    filename: __filename
};

cmd(forwardCommand, async (
    conn, // Represents the connection
    mek, // Message object
    store, // Store for additional information
    {
        from, // Origin of the message
        quoted, // Quoted message object
        q, // Query parameter (target JID)
        isOwner, // If the sender is the bot owner
        reply // Function to reply to the sender
    }
) => {
    // Ensure the command is executed by the owner
    if (!isOwner) {
        return reply("Owner Only ❌");
    }

    // Validate the input
    if (!q) {
        return reply("Please provide a target JID address ❌");
    }

    if (!quoted) {
        return reply("Please reply to a message you want to forward ❌");
    }

    // Extract the quoted message object
    const forwardMessage = quoted.fakeObj ? quoted.fakeObj : quoted;

    try {
        // Forward the message to the target JID
        await conn.sendMessage(q, { forward: forwardMessage });

        // Send a confirmation to the owner
        return reply(`*Message forwarded successfully to:*\n\n${q}`);
    } catch (error) {
        // Handle errors
        console.error("Error forwarding message:", error);
        return reply("Failed to forward the message ❌");
    }
});