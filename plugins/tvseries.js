const config = require("../config");
const { cmd, commands } = require("../command");
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  minimize,
  fetchJson,
} = require("../lib/functions");
const { sinhalaSub } = require("mrnima-moviedl");
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
async function pickr(jsonData) {
    if (jsonData.images && jsonData.images.length > 0) {
        const randomIndex = Math.floor(Math.random() * jsonData.images.length);
        return jsonData.images[randomIndex];
    } else {
        return 'No images available';
    }
}

cmd(
  {
    pattern: "tvseries",
    alias: ["tvs", "tv"],
    use: ".tvseries *<tv series name>*",
    react: "🍟",
    desc: "Search and DOWNLOAD VIDEOS from sinhala sub.",
    category: "movie",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("🚩 *Please give me words to search*");
      var res = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/tvshow/search?q=${q}`)
      var ress = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/tvshow/search?q=${q}`)
      let wm = config.FOOTER;
      const msg = `乂 *T V S E R I E S - S E A R C H*`;
     // const data = res.result;
      console.log(res)
      if (res.length < 1)
        return await conn.sendMessage(
          from,
          { text: "🚩 *I couldn't find anything :(*" },
          { quoted: mek }
        );

var rows = ress.map((v) => ({
    title: `${v.title} - ${v.year}`,
    rowId: `${prefix}tvdl ${v.link}`
}));

var rowss = res.map((v) => ({
    title: `${v.title} - ${v.year}`,
    rowId: `${prefix}sstdl ${v.link}`
}));

const listMessage = {
    text: msg, // Message text
    image: "https://i.ibb.co/MBztxCZ/6779448f5f73f.jpg",
    footer: config.FOOTER,
    title: 'Select a TV Show', // Title for the list
    buttonText: '*🔢 Reply below number*', // Button text
    sections: [{
        title: "sinhalasub.lk",
        rows: rowss // Assign the rows created above
    },
    {
        title: "cinesubz.co",
        rows: rows // Assign the rows created above
    }]
};

await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

cmd(
  {
    pattern: "tvdl",
    dontAddCommandList: true,
    react: "🍟",
    filename: __filename,
  },
    async (
    conn,
    mek,
    m,
    {
      from,
      l,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {

      if (!q) return reply("🚩 *Please give me a url*");

      let wm = config.FOOTER;

      const result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/tvshow/details?url=${q}`)
      const image = await pickr(result)
      console.log(q)
      const msg = `乂 *T V S E R I E S - D L*
        
 *◦ Title :* ${result.title}
 *◦ Description :* ${result.description}
 *◦ rating :* ${result.ratingCount}`

      let raw = [];
      raw.push({
        title: `Send Detail Card`,
        rowId: `${prefix}tvde ${q}`,
      });

      result.episodes.map((v) => {
        raw.push({
          title: `${v.title} - ${v.date}`,
          rowId: `${prefix}tvedl ${v.link}`,
        });
      });

      const sections = [
        {
          title: "select an episode..",
          rows: raw,
        },
      ];

      const listMessage = {
        image: image,
        text: msg,
        footer: config.FOOTER,
        title: "sended details",
        buttonText: "Select a number",
        sections,
      };
      await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await reply(`${e}`);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

cmd(
  {
    pattern: "tvde",
    dontAddCommandList: true,
    react: "🍎",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {

      if (!q) return reply("🚩 *Please give me a url*");

      let wm = config.FOOTER;

      const result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/tvshow/details?url=${q}`)
      const image = await pickr(result)
      console.log(q)
      const msg = `乂 *T V S H O W - I N F O*
        
 *◦ Title :* ${result.title}
 *◦ Description :* ${result.description}
 *◦ rating :* ${result.ratingCount}

 ${config.FOOTER}`
      
      return await conn.sendMessage(
        from,
        { image: { url: image }, caption: msg },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "tvedl",
    dontAddCommandList: true,
    react: "🍟",
    filename: __filename,
  },
    async (
    conn,
    mek,
    m,
    {
      from,
      l,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      
      if (!q) return reply("🚩 *Please give me a url*");

      let wm = config.FOOTER;

      const result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/tvshow/downloadlinks?url=${q}`)
      const image = await pickr(result)
      console.log(q)
      const msg = `乂 *T V S E R I E S - D L*
        
 *◦ Title :* ${result.title}
 *◦ Description :* ${result.description}
 *◦ rating :* ${result.date}`

      let raw = [];
      raw.push({
        title: `Send Detail Card`,
        rowId: `${prefix}tvdei ${q}`,
      });

      result.downloadLinks.map((v) => {
        raw.push({
          title: `${v.quality} - ${v.size}`,
          rowId: `${prefix}gcs ${v.link}±${image}`,
        });
      });

      const sections = [
        {
          title: "select a quality...",
          rows: raw,
        },
      ];

      const listMessage = {
        image: image,
        text: msg,
        footer: config.FOOTER,
        title: "sended details",
        buttonText: "Select a number",
        sections,
      };
      await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await reply(`${e}`);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

cmd(
  {
    pattern: "tvdei",
    dontAddCommandList: true,
    react: "🍎",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {

      try {
      const result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/tvshow/downloadlinks?url=${q}`)
      const image = await pickr(result)
      console.log(q)
      const msg = `乂 *T V S H O W - I N F O*
        
 *◦ Title :* ${result.title}
 *◦ Description :* ${result.description}
 *◦ rating :* ${result.date}

 ${config.FOOTER}`
      
      return await conn.sendMessage(
        from,
        { image: { url: image }, caption: msg },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
    }
  }
);


cmd(
  {
    pattern: "movie",
    alias: ["sinhalasub", "film", "cine", "cs", "ss", "cinesubz"],
    use: ".movie *<movie name>*",
    react: "🍟",
    desc: "Search and DOWNLOAD VIDEOS from sinhala sub.",
    category: "movie",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {

      if (!q) return reply("🚩 *Please give me words to search*");
      var res = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/movie/search?q=${q}`)
      var ress = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/movie/search?q=${q}`)
      let wm = config.FOOTER;
      const msg = `乂 *M O V I E - S E A R C H*`;
      if (res.length < 1 && ress.length < 1 )
        return await conn.sendMessage(
          from,
          { text: "🚩 *I couldn't find anything :(*" },
          { quoted: mek }
        );
var rows = ress.map((v) => ({
    title: `${v.title} - ${v.year}`,
    rowId: `${prefix}ssdl ${v.link}`
}));
      
var rows2 = res.map((v) => ({
    title: `${v.title} - ${v.year}`,
    rowId: `${prefix}csdl ${v.link}`
}));

const listMessage = {
    text: msg, // Message text
    image: "https://i.ibb.co/0q34kPZ/image.png",
    footer: config.FOOTER,
    title: 'Select a Movie', // Title for the list
    buttonText: '*🔢 Reply below number*', // Button text
    sections: [{
        title: "sinhalasub.lk",
        rows: rows
    },
    {
        title: "cinesubz.co",
        rows: rows2   
    }]
};

await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

cmd(
  {
    pattern: "csdl",
    dontAddCommandList: true,
    react: "🍟",
    filename: __filename,
  },
    async (
    conn,
    mek,
    m,
    {
      from,
      l,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {

      if (!q) return reply("🚩 *Please give me a url*");

      let wm = config.FOOTER;

      const result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/movie/details?url=${q}`)
      const image = await pickr(result)
      const msg = `乂 *C I N E S U B Z - D L*
        
 *◦ Title :* ${result.title}
 *◦ Date :* ${result.releaseDate}
 *◦ Country :* ${result.country}
 *◦ Duration :* ${result.runtime}
 *◦ Imdb rating :* ${result.imdbRating}
 *◦ Description :* ${result.description} `

      let raw = [];
      raw.push({
        title: `Send Detail Card`,
        rowId: `${prefix}csde ${q}`,
      });

      result.downloadLinks.map((v) => {
        raw.push({
          title: `${v.quality} - ${v.size}`,
          rowId: `${prefix}gcs ${v.link}±${image}`,
        });
      });

      const sections = [
        {
          title: "cinesubz.co",
          rows: raw,
        },
      ];

      const listMessage = {
        image: image,
        text: msg,
        footer: config.FOOTER,
        title: "sended details",
        buttonText: "Select a number",
        sections,
      };
      await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await reply(`${e}`);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);
cmd(
  {
    pattern: "csde",
    dontAddCommandList: true,
    react: "🍎",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {

      const result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/movie/details?url=${q}`)
      const image = await pickr(result)
      console.log(q)
      const info = `乂 *M O V I E - I N F O*
        
 *◦ Title :* ${result.title}
 *◦ Date :* ${result.releaseDate}
 *◦ Country :* ${result.country}
 *◦ Duration :* ${result.runtime}
 *◦ Imdb rating :* ${result.imdbRating}
 *◦ Description :* ${result.description}

 ${config.FOOTER}`
      
      return await conn.sendMessage(
        from,
        { image: { url: image }, caption: info },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
    }
  }
);

async function convertDownloadToViewLink(downloadLink) {
    
    const match = downloadLink.match(/id=([^&]+)/);
    if (match && match[1]) {
        const fileId = match[1]; 
        const glink = `https://drive.google.com/file/d/${fileId}/view?usp=drivesdk`;
       // let res = await GDriveDl(glink)      
        return glink
    }
    return "Invalid download link";
}

cmd(
  {
    pattern: "gcs",
    react: "🍟",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {

      if (!q) return reply("Need a keyword");
      const link = q.split("±")[0];
      const image = q.split("±")[1] || `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/74d2a00a-b5c0-42d4-b131-fafcca22e4cf/d7ay4tw-1fa7c44d-2500-43ef-8d40-c16d939ca024.png`
      var result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/cinesubz/download?url=${link}`)
      const gdrivelink = result.gdriveLink || result.gdriveLink2
      let newlink = await convertDownloadToViewLink(gdrivelink);
      const buttons = [
        {
          buttonId: `${prefix}gdrive ${newlink}±${image}`,
          buttonText: { displayText: "Download The Movie/Tv Series" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: config.THUMB,
        caption: `🎐 download link is *${newlink}*`,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 1,
      };
      await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      reply("Unable to generate");
      console.log(e);
    }
  }
)


//------------------------dl---------------

cmd(
  {
    pattern: "ssdl",
    dontAddCommandList: true,
    react: "🍟",
    filename: __filename,
  },
  async (conn, mek, m, { from, prefix, q }) => {
    try {
      // if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
      if (!q) return reply("🚩 *Please give me a url*");

      let wm = config.FOOTER;

      var result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/movie/details?url=${q}`)

      const msg = `乂 *S I N H A L A S U B - D L*
        
 *◦ Title :* ${result.title}
 *◦ Date :* ${result.releaseDate}
 *◦ Mean :* ${result.tagline}
 *◦ Duration :* ${result.duration}
 *◦ Imdb rating :* ${result.imdbRating}
 *◦ Genres :* ${result.genres.join(", ")}
 *◦ Rating :* ${result.ratingCount}
 `;

      let raw = [];
      raw.push({
        title: `Send Detail Card`,
        rowId: `${prefix}ssde ${q}`,
      });

      result.downloadLinks.map((v) => {
        raw.push({
          title: `${v.server} - ${v.quality} - ${v.size}`,
          rowId: `${prefix}gss ${v.link}±${result.title}±${result.image}`,
        });
      });

      const sections = [
        {
          title: "sinhalasub.lk",
          rows: raw,
        },
      ];

      const listMessage = {
        image: result.image,
        text: msg,
        footer: config.FOOTER,
        title: "sended details",
        buttonText: "Select a number",
        sections,
      };
      await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await reply(`${e}`);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);
cmd(
  {
    pattern: "sstdl",
    dontAddCommandList: true,
    react: "🍟",
    filename: __filename,
  },
  async (conn, mek, m, { from, prefix, q }) => {
    try {
      // if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
      if (!q) return reply("🚩 *Please give me a url*");

      var result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/tvshow/details?url=${q}`)

      const msg = `乂 *S I N H A L A S U B - D L*
        
 *◦ Title :* ${result.title}
 *◦ Description :* ${result.description}
 *◦ Seasons :* ${result.seasons}
 *◦ FirstAirDate :* ${result.firstAirDate}
 *◦ Genres :* ${result.genres.join(", ")}
 *◦ Rating :* ${result.rating}
 `;

      let raw = [];
      raw.push({
        title: `Send Detail Card`,
        rowId: `${prefix}sstde ${q}`,
      });

      result.episodes.map((v) => {
        raw.push({
          title: `${v.title} - ${v.date}`,
          rowId: `${prefix}gsst ${v.link}`,
        });
      });

      const sections = [
        {
          title: "results from sinhalasub.lk",
          rows: raw,
        },
      ];

      const listMessage = {
        image: result.image,
        text: msg,
        footer: config.FOOTER,
        title: "sended details",
        buttonText: "Select a number",
        sections,
      };
      await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await reply(`${e}`);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

cmd(
  {
    pattern: "ssde",
    dontAddCommandList: true,
    react: "🍎",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      var result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/movie/details?url=${q}`)
      let info = `乂 *M O V I E - I N F O*
        
 *◦ Title :* ${result.title}
 *◦ Date :* ${result.releaseDate}
 *◦ Mean :* ${result.tagline}
 *◦ Duration :* ${result.duration}
 *◦ Imdb rating :* ${result.imdbRating}
 *◦ Genres :* ${result.genres.join(", ")}
 *◦ Rating :* ${result.ratingCount}

 ${config.FOOTER}`
      return await conn.sendMessage(
        from,
        { image: { url: result.image }, caption: info },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "sstde",
    dontAddCommandList: true,
    react: "🍎",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      var result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/tvshow/details?url=${q}`)

      const msg = `乂 *T V S E R I E S - I N F O*
        
 *◦ Title :* ${result.title}
 *◦ Description :* ${result.description}
 *◦ Seasons :* ${result.seasons}
 *◦ FirstAirDate :* ${result.firstAirDate}
 *◦ Genres :* ${result.genres.join(", ")}
 *◦ Rating :* ${result.rating}
 
 ${config.FOOTER}`
      return await conn.sendMessage(
        from,
        { image: { url: result.image }, caption: msg },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "sstdl",
    dontAddCommandList: true,
    react: "🍟",
    filename: __filename,
  },
  async (conn, mek, m, { from, prefix, q }) => {
    try {
      // if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
      if (!q) return reply("🚩 *Please give me a url*");

      var result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/tvshow/details?url=${q}`)

      const msg = `乂 *T V S E R I E S - D L*
        
 *◦ Title :* ${result.title}
 *◦ Description :* ${result.description}
 *◦ Seasons :* ${result.seasons}
 *◦ FirstAirDate :* ${result.firstAirDate}
 *◦ Genres :* ${result.genres.join(", ")}
 *◦ Rating :* ${result.rating}
 `;

      let raw = [];
      raw.push({
        title: `Send Detail Card`,
        rowId: `${prefix}sstde ${q}`,
      });

      result.episodes.map((v) => {
        raw.push({
          title: `${v.title} - ${v.date}`,
          rowId: `${prefix}gsst ${v.link}`,
        });
      });

      const sections = [
        {
          title: "results from sinhalasub.lk",
          rows: raw,
        },
      ];

      const listMessage = {
        image: result.image,
        text: msg,
        footer: config.FOOTER,
        title: "sended details",
        buttonText: "Select a number",
        sections,
      };
      await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await reply(`${e}`);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);
cmd(
  {
    pattern: "gsst",
    dontAddCommandList: true,
    react: "🍟",
    filename: __filename,
  },
  async (conn, mek, m, { from, prefix, q }) => {
    try {
      // if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
      if (!q) return reply("🚩 *Please give me a url*");

      var result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/tvshow/download?url=${q}`)

      const msg = `乂 *T V S E R I E S - D L*
        
 *◦ Title :* ${result.title}`

      let raw = [];
      raw.push({
        title: `Send Detail Card`,
        rowId: `${prefix}gsstde ${q}`,
      });

      result.downloadLinks.map((v) => {
        raw.push({
          title: `${v.server} - ${v.quality} - ${v.size}`,
          rowId: `${prefix}gss ${v.link}±${result.title}±${result.episodeImage}`,
        });
      });

      const sections = [
        {
          title: "results from sinhalasub.lk",
          rows: raw,
        },
      ];

      const listMessage = {
        image: result.episodeImage,
        text: msg,
        footer: config.FOOTER,
        title: "sended details",
        buttonText: "Select a number",
        sections,
      };
      await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      console.log(e);
      await reply(`${e}`);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);
cmd(
  {
    pattern: "sstde",
    dontAddCommandList: true,
    react: "🍎",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
            var result = await fetchJson(`https://suhas-md-movie-api.vercel.app/api/sinhalasub/tvshow/download?url=${q}`)

      const msg = `乂 *T V S E R I E S - D L*
        
 *◦ Title :* ${result.title}
 
 ${config.FOOTER}`
      return await conn.sendMessage(
        from,
        { image: { url: result.episodeImage }, caption: msg },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
    }
  }
);
cmd(
  {
    pattern: "gss",
    react: "🍟",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      l,
      prefix,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("Need a keyword");
      const link = q.split("±")[0];
      const namee = q.split("±")[1] || link;
      const image = q.split("±")[2] || `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/74d2a00a-b5c0-42d4-b131-fafcca22e4cf/d7ay4tw-1fa7c44d-2500-43ef-8d40-c16d939ca024.png`
      const name = namee.replace(/\s+/g, "_");
      const url = link //✅${link}`;
      const response = await fetch(url)
      const success = await response.text()
      const $ = cheerio.load(success)
      const $p = cheerio.load(success);
      const lastLink = $p("#link").attr("href");
      let cmd;
      if (lastLink.includes("https://mega.nz")) {
        cmd = "mega";
      } else {
        cmd = "fetchmp4"; 
      }
      let dllink;
      if (lastLink.includes("https://pixeldrain.com/")) {
        dllink = lastLink.replace("/u/", "/api/file/");
      } else {
        dllink = lastLink; 
      }
      const buttons = [
        {
          buttonId: `${prefix}${cmd} ${dllink}±${name}±${image}`,
          buttonText: { displayText: "DOWNLOAD THE MOVIE" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: config.THUMB,
        caption: `🎐 download link is *${dllink}*`,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 1,
      };
      await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      reply("Unable to generate");
      console.log(e);
    }
  }
)
