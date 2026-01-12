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
  fetchJson,
} = require("../lib/functions");
const { fbdl } = require("ruhend-scraper");
const fs = require("fs-extra");
const { igdl } = require("ruhend-scraper");
var needus = "🚩*Please give me facebook url !!*";
var needig = "🚩*Please give me instagram url !!*";
var cantf = "🚩 *I cant find this media!*";
const axios = require("axios");
const cheerio = require("cheerio");
const { fbdown } = require("../lib/fbdl");
cmd(
  {
    pattern: "facebook1",
    alias: ["fb1"],
    category: "download",
    use: ".fb *<Facebook Url>*",
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
      if (!q) return await reply(needus);
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      let wm = config.FOOTER;
      let text = q;
      let status, result;

      ({ status, result } = await fbdown.V2(text));
      if (!status) {
        ({ status, result } = await fbdown.V3(text));
      }
      if (!status) {
        ({ status, result } = await fbdown.V1(text));
      }
      if (!status) {
        return await reply("*Please check the url and try again*");
      }

      const filteredMedia = result.media.filter((m) =>
        (m?.quality || "").includes("HD")
      );

      for (const media of filteredMedia) {
        if ((media?.quality || "").includes("HD")) {
          await conn.sendMessage(
            from,
            { video: { url: media.url }, caption: wm },
            { quoted: mek }
          );
        }
      }
    } catch (e) {
      let res = await fbdl(text);
      let result = res.data,
        data;

      try {
        data = result.find((i) => i.resolution === "720p (HD)");
        m.reply(`Data Found!`);
      } catch {
        m.reply(`HD not found, switching to SD`);
        data = result.find((i) => i.resolution === "360p (SD)");
      }

      let video = data.url;
      conn.sendFile(from, video, {
        caption: config.FOOTER,
        quoted: mek,
      });

      console.log(e);
    }
  }
);;

let needtt = "🚩 *Please give me a tiktok url!*";

//========================================================================================
async function dlPanda(url) {
  try {
    const response = await fetch(
        `https://dlpanda.com/id?url=${url}&token=G7eRpMaa`
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      results = {
        image: [],
        video: [],
      };
    return (
      $(
        "div.hero.col-md-12.col-lg-12.pl-0.pr-0 img, div.hero.col-md-12.col-lg-12.pl-0.pr-0 video"
      ).each(function () {
        const element = $(this),
          isVideo = element.is("video"),
          src = isVideo
            ? element.find("source").attr("src")
            : element.attr("src"),
          fullSrc = src.startsWith("//") ? "https:" + src : src;
        results[isVideo ? "video" : "image"].push({
          src: fullSrc,
          width: element.attr("width"),
          ...(isVideo
            ? {
                type: element.find("source").attr("type"),
                controls: element.attr("controls"),
                style: element.attr("style"),
              }
            : {}),
        });
      }),
      results
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
//==================================================================

cmd(
  {
    pattern: "tiktok1",
    alias: ["tt1", "ttdl1", "tiktokdl1"],
    desc: "Download tiktok videos",
    category: "download",
    use: ".tiktok *<Tiktok Url>*",
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
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      if (!q) return await reply(needtt);
      if (!q.includes("tiktok")) return await reply("invalid_url");

      const mov = await fetchJson(
        `https://api-pink-venom.vercel.app/api/tiktok?url=${q}&apikey=mnp3grlZ`
      );

      let yt = `*SUHAS-MD TIKTOK DOWNLOADER. 📥*

    *◈ Title:* ${mov.result.title}
    *◈ Region:* ${mov.result.region}
    *◈ Duration:* ${mov.result.duration}
`;
      const buttons = [
        {
          buttonId: prefix + `ttvid ${mov.result.no_wm}`,
          buttonText: { displayText: "DOWNLOAD VIDEO WITHOUT WATERMARK" },
          type: 1,
        },
        {
          buttonId: prefix + `ttvid ${mov.result.with_wm}`,
          buttonText: { displayText: "DOWNLOAD VIDEO WATERMARK" },
          type: 1,
        },
        {
          buttonId: prefix + `tikmp3 ${mov.result.music}`,
          buttonText: { displayText: "DOWNLOAD VIDEO AUDIO" },
          type: 1,
        },
      ];
      const buttonMessage = {
        image: mov.result.cover,
        caption: yt,
        footer: config.FOOTER,
        buttons: buttons,
        headerType: 4,
      };
      await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      if (!q) return reply("🚩 *Please give me words to search*");
      const data = await dlPanda(q);
      if (0 === data.video.length)
        for (let i = 0; i < data.image.length; i++)
          await conn.sendMessage(
            from,
            { image: { url: data.image[i].src }, caption: config.FOOTER },
            { quoted: mek }
          );
      else
        for (let i = 0; i < data.video.length; i++)
          await conn.sendMessage(
            from,
            { video: { url: data.video[i].src }, caption: config.FOOTER },
            { quoted: mek }
          );
      console.log(e);
      reply(`${e}`);
    }
  }
);
//===========================================================================
cmd(
  {
    pattern: "ttvid",
    dontAddCommandList: true,
    use: ".tt1 <tiktok link>",
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
      if (!q) return await reply(needus);
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      let wm = config.FOOTER;
      await conn.sendFile(from, q, null, wm, mek);
      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);
//==============================================================================

cmd(
  {
    pattern: "tikmp3",
    alias: ["tiktokmp3"],
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
      if (!q) return await reply(needus);
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      conn.sendMessage(
        from,
        { audio: { url: q }, mimetype: "audio/mpeg" },
        { quoted: mek }
      );
      await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "tiktok2",
    alias: ["tt2"],
    use: ".tiktok2 *<Tiktok Url>*",
    desc: "Download videos and images from tiktok.",
    category: "download",
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
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      if (!q) return reply("🚩 *Please give me words to search*");
      const data = await dlPanda(q);
      let wm = config.FOOTER;
      if (0 === data.video.length)
        for (let i = 0; i < data.image.length; i++)
          await conn.sendMessage(
            from,
            { image: { url: data.image[i].src }, caption: wm },
            { quoted: mek }
          );
      else
        for (let i = 0; i < data.video.length; i++)
          await conn.sendMessage(
            from,
            { video: { url: data.video[i].src }, caption: wm },
            { quoted: mek }
          );
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

const _twitterapi = (id) => `https://info.tweeload.site/status/${id}.json`;
const getAuthorization = async () => {
  const { data } = await axios.default.get("https://pastebin.com/raw/SnCfd4ru");
  return data;
};
const TwitterDL = async (url) => {
  return new Promise(async (resolve, reject) => {
    const id = url.match(/\/([\d]+)/);
    if (!id)
      return resolve({
        status: "error",
        message: tradutor.texto4,
      });
    const response = await axios.default(_twitterapi(id[1]), {
      method: "GET",
      headers: {
        Authorization: await getAuthorization(),
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
      },
    });

    if (response.data.code !== 200) {
      return resolve({
        status: "error",
        message: tradutor.texto5,
      });
    }

    const author = {
      id: response.data.tweet.author.id,
      name: response.data.tweet.author.name,
      username: response.data.tweet.author.screen_name,
      avatar_url: response.data.tweet.author.avatar_url,
      banner_url: response.data.tweet.author.banner_url,
    };

    let media = [];
    let type;

    if (response.data.tweet?.media?.videos) {
      type = "video";
      response.data.tweet.media.videos.forEach((v) => {
        const resultVideo = [];
        v.video_urls.forEach((z) => {
          resultVideo.push({
            bitrate: z.bitrate,
            content_type: z.content_type,
            resolution: z.url.match(/([\d ]{2,5}[x][\d ]{2,5})/)[0],
            url: z.url,
          });
        });
        if (resultVideo.length !== 0) {
          media.push({
            type: v.type,
            duration: v.duration,
            thumbnail_url: v.thumbnail_url,
            result: v.type === "video" ? resultVideo : v.url,
          });
        }
      });
    } else {
      type = "photo";
      response.data.tweet.media.photos.forEach((v) => {
        media.push(v);
      });
    }

    resolve({
      status: "success",
      result: {
        id: response.data.tweet.id,
        caption: response.data.tweet.text,
        created_at: response.data.tweet.created_at,
        created_timestamp: response.data.tweet.created_timestamp,
        replies: response.data.tweet.replies,
        retweets: response.data.tweet.retweets,
        likes: response.data.tweet.likes,
        url: response.data.tweet.url,
        possibly_sensitive: response.data.tweet.possibly_sensitive,
        author,
        type,
        media: media.length !== 0 ? media : null,
      },
    });
  });
};

cmd(
  {
    pattern: "twitter2",
    alias: ["twit2", "x"],
    use: ".twitter *<Twitter Url>*",
    desc: "Download videos and images from twitter.",
    category: "download",
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
      await conn.sendMessage(from, { react: { text: "💫", key: mek.key } });
      if (!q) return reply("🚩 *Please give me words to search*");
      const res = await TwitterDL(q);
      if (res?.result.type == "video") {
        const caption = res?.result.caption
          ? res.result.caption
          : tradutor.texto2;
        for (let i = 0; i < res.result.media.length; i++) {
          await conn.sendMessage(
            from,
            {
              video: { url: res.result.media[i].result[0].url },
              caption: config.FOOTER,
            },
            { quoted: mek }
          );
        }
      } else if (res?.result.type == "photo") {
        const caption = res?.result.caption
          ? res.result.caption
          : tradutor.texto2;
        for (let i = 0; i < res.result.media.length; i++) {
          await conn.sendMessage(
            from,
            { image: { url: res.result.media[i].url }, caption: config.FOOTER },
            { quoted: mek }
          );
        }
      }
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

cmd(
  {
    pattern: "tiktoksearch1",
    alias: ["tiks1"],
    use: ".tiktoksearch *<Your Text>*",
    react: "📥",
    desc: "Search TikTok Deatils",
    category: "search",
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
      let mal = await fetchJson(
        "https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=" +
          q
      );
      let res = mal.data;
      let data = mal.data;
      let wm = config.FOOTER;
      if (data.length < 1)
        return await conn.sendMessage(
          from,
          { text: "🚩 *I couldn't find anything :(*" },
          { quoted: mek }
        );
      var rows = [];
      data.map((v) => {
        rows.push({
          buttonId: `${prefix}ttvid ${v.nowm}`,
          buttonText: { displayText: `${v.title} - ${v.creator}` },
          type: 1,
        });
      });

      const buttonMessage = {
        image:
          "https://i.ibb.co/N6nWD9m/20250128-100821.jpg",
        caption: `*SUHAS-MD TIKTOK SEARCH. 🗂* `,
        footer: wm,
        buttons: rows,
        headerType: 4,
      };
      return await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

async function downloadt(url) {
  try {
    const regex = /post\/([^/?]+)/;
    const match = url.match(regex);
    const id = match ? match[1] : null;

    if (!id) {
      return {
        status: false,
        msg: "Invalid ID.",
      };
    }

    const headers = {
      accept: "*/*",
    };

    const { data } = await axios.get(`https://threadster.app/download/${id}`, {
      headers,
    });
    const $ = cheerio.load(data);
    const media = [];

    $(
      ".download__wrapper .download__items .download_item .image_wrapper .image img"
    ).each((index, element) => {
      const imageUrl = $(element).attr("src");
      if (imageUrl) {
        media.push({ type: "image", url: imageUrl });
      }
    });

    $(
      ".download__wrapper .download__items .download_item .video_wrapper .video video"
    ).each((index, element) => {
      const videoUrl = $(element).attr("src");
      if (videoUrl) {
        media.push({ type: "video", url: videoUrl });
      }
    });

    const title = $(
      ".download__wrapper .download__items .download_item .download__item__caption .download__item__caption__text"
    )
      .first()
      .text();

    return {
      status: true,
      result: {
        title,
        media,
      },
    };
  } catch (e) {
    return {
      status: false,
      msg: e.message,
    };
  }
}

cmd(
  {
    pattern: "threads",
    alias: ["thread"],
    react: "🧵",
    desc: "Download threads videos/photos.",
    category: "download",
    use: ".threads *<Threads Url>*",
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
      if (!q) return await reply("*Please give me threads url !!*");
      let { status, result } = await downloadt(q);
      for (let i = 0; i < result.media.length; i++) {
        conn.sendFile(from, result.media[i].url, null, config.FOOTER, mek);
      }
    } catch (e) {
      reply("*I cant find this video!*");
      console.log(e);
    }
  }
);

async function ringtone(title) {
  return new Promise((resolve, reject) => {
    axios.get("https://meloboom.com/es/search/" + title).then((get) => {
      const $ = cheerio.load(get.data);
      const hasil = [];
      $(
        "#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li"
      ).each(function (a, b) {
        hasil.push({
          title: $(b).find("h4").text(),
          source: "https://meloboom.com/" + $(b).find("a").attr("href"),
          audio: $(b).find("audio").attr("src"),
        });
      });
      resolve(hasil);
    });
  });
}

cmd(
  {
    pattern: "ringtone",
    alias: ["ring"],
    use: ".ringtone *<Song Name>*",
    react: "📥",
    desc: "Search and Download Ringtones.",
    category: "download",
    filename: __filename,
  },

  async (
    conn,
    mek,
    m,
    {
      from,
      prefix,
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
      //if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
      if (!q) return reply("🚩 *Please give me words to search*");
      const res = await ringtone(q);
      let wm = config.FOOTER;
      if (res.length < 1)
        return await conn.sendMessage(
          from,
          { text: "🚩 *I couldn't find anything :(*" },
          { quoted: mek }
        );
      var rows = [];
      res.map((v) => {
        rows.push({
          buttonId: `${prefix}ringdl ${v.audio}`,
          buttonText: { displayText: `${v.title}` },
          type: 1,
        });
      });

      const buttonMessage = {
        image: "https://m.media-amazon.com/images/I/61SvvYYuaAL.jpg",
        caption: `*SUHAS-MD RIGINTON SEARCH.🎶* `,
        footer: wm,
        buttons: rows,
        headerType: 4,
      };
      return await conn.buttonMessage(from, buttonMessage, mek);
    } catch (e) {
      console.log(e);
      await conn.sendMessage(from, { text: "🚩 *Error !!*" }, { quoted: mek });
    }
  }
);

//------------------------dl---------------

cmd(
  {
    pattern: "ringdl",
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
      await conn.sendMessage(from, { react: { text: "📥", key: mek.key } });
      if (!q)
        return await conn.sendMessage(
          from,
          { text: "*Need link...*" },
          { quoted: mek }
        );
      conn.sendMessage(
        from,
        { audio: await getBuffer(q), mimetype: "audio/mpeg" },
        { quoted: mek }
      );
    } catch (e) {
      reply("*ERROR !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "joinsup",
    react: "🔖",
    desc: "To leave a group",
    category: "owner",
    use: ".joinsup",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      prefix,
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
      if (!isOwner) return await reply("🚩 *You must be a bots owner frist*");
      await conn.groupAcceptInvite(config.SUPPORT);
      await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
      await reply(
        "✅ *You have successfully/already joined to our support group*"
      );
    } catch (e) {
      reply(
        "🚩 *You cant join to our support group, beacuse your were removed recently...*"
      );
      console.log(e);
    }
  }
);
