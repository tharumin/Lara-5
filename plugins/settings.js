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
var {
  updateCMDStore,
  isbtnID,
  getCMDStore,
  getCmdForCmdId,
  connectdb,
  input,
  get,
  updb,
  updfb,
  upresbtn,
} = require("../lib/database");

var tesadtag = "*Give me a Text to Update Settings.⁉️*";
var desc1 = "It updates groups setting fetures.";
var desc2 = "It Updates Bot's  Settings.⚡";
var desc3 = "It Updates Bot's Configs.⚡";
var ONLGROUP = "*This is Not a Group.❗❗*";
var ADMIN = "*You Are Not an Admin.❗*";
var ADMINim = "*Im not an admin !*";
var BOTOW = "*You Are Not Bot's Owner or Moderator.🤧❗*";
var alredy = "*This setting alredy updated !*";

cmd(
  {
    pattern: "groupsettings",
    react: "⚙️",
    alias: ["groupset", "groupsettings"],
    desc: desc1,
    category: "group",
    use: ".group - *Group Settings*",
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
      if (!isGroup) return await reply("🚫 *This command can only be used in groups!*");
      if (!isAdmins) return await reply("👮 *Only admins can use this command!*");
      if (!isBotAdmins) return await reply("🤖 *I need admin privileges to perform this action!*");
      const msg = "⚙️ \`SUHAS-MD GROUP SETTINGS.\` ⚙️"

      const sections = [
        {
          title: "🔗 *Anti Link*",
          rows: [
            {
              title: "✅ TURN ON",
              rowId: prefix + "antilink on",
            },
            {
              title: "❌ TURN OFF",
              rowId: prefix + "antilink off",
            },
          ],
        },
        {
          title: "🚫 *Anti Bad Words*",
          rows: [
            {
              title: "✅ TURN ON",
              rowId: prefix + "antibad on",
            },
            {
              title: "❌ TURN OFF",
              rowId: prefix + "antibad off",
            },
          ],
        },
        {
          title: "🤖 *Anti Bots*",
          rows: [
            {
              title: "✅ TURN ON",
              rowId: prefix + "antibot on",
            },
            {
              title: "❌ TURN OFF",
              rowId: prefix + "antibot off",
            },
          ],
        },
      ];
      
        const listMessage = { 
	          image: config.logo,
	          text: msg,
            footer: config.FOOTER,
            buttonText: "*🔢 Reply below number*",
            sections
        };
	await conn.listMessage(from, listMessage, mek);
    } catch (e) {
      reply("*❌ Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "settings",
    react: "⚙️",
    alias: ["setting", "botsetting"],
    desc: desc2,
    category: "owner",
    use: ".settings - *Bot Settings*",
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
      prefix,
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
      if (!isMe) return await reply("🚫 *You are not authorized to use this command!*");

      const sections = [
        {
          title: "🔧 WORK TYPE",
          rows: [
            { title: "🫂 Only Group", rowId: prefix + "wtype group" },
            { title: "👥 Public", rowId: prefix + "wtype public" },
            { title: "👤 Only Me", rowId: prefix + "wtype me" },
          ],
        },
        {
          title: "🤖 *BOT PRESENCE*",
          rows: [
            { title: "🔋 Always Online", rowId: prefix + "wapres available" },
            { title: "🪫 Always Offline", rowId: prefix + "wapres unavailable" },
            { title: "💬 Auto Typing", rowId: prefix + "wapres composing" },
            { title: "🎙️ Auto Recording", rowId: prefix + "wapres recording" },
          ],
        },
        {
          title: "👁️ *STATUS AUTO SEEN*",
          rows: [
            { title: "👀 Auto Status Seen", rowId: prefix + "rstatus on" },
            { title: "❌ Disable Auto Seen", rowId: prefix + "rstatus off" },
          ],
        },
	{
          title: "🛟 *AUTO STATUS REPLY*",
          rows: [
            { title: "✅ Turn ON", rowId: prefix + "asr on" },
            { title: "❎ Turn OFF", rowId: prefix + "asr off" },
          ],
        },
	{
          title: "📱 *AUTO STATUS REACT*",
          rows: [
            { title: "✅ Turn ON", rowId: prefix + "sreact on" },
            { title: "❎ Turn OFF", rowId: prefix + "sreact off" },
          ],
        },
        {
          title: "📞 *AUTO REJECT CALL*",
          rows: [
            { title: "✅ Auto Reject Call", rowId: prefix + "creject on" },
            { title: "❌ Allow Calls", rowId: prefix + "creject off" },
          ],
        },
        {
          title: "🚫 *AUTO BLOCK IB*",
          rows: [
            { title: "🛡️ Auto Block All", rowId: prefix + "allblock all" },
            { title: "🛑 Auto Block Cmd", rowId: prefix + "allblock cmd" },
            { title: "❌ Auto Block Off", rowId: prefix + "allblock off" },
          ],
        },
        {
          title: "💳 *AUTO BIO*",
          rows: [
            { title: "✅ Turn ON", rowId: prefix + "abio on" },
            { title: "❎ Turn OFF", rowId: prefix + "abio off" },
          ],
        },
        {
          title: "🎤 *AUTO VOICE*",
          rows: [
            { title: "✅ Turn ON", rowId: prefix + "avoice on" },
            { title: "❎ Turn OFF", rowId: prefix + "avoice off" },
          ],
	},
        {
          title: "🗑️ *ANTI DELETE*",
          rows: [
            { title: "✅ Turn ON", rowId: prefix + "antide on" },
            { title: "❎ Turn OFF", rowId: prefix + "antide off" },
          ],
        },
	{
          title: "🧰 *MOROCCO BLOCK*",
          rows: [
            { title: "✅ Turn ON", rowId: prefix + "mblock on" },
            { title: "❎ Turn OFF", rowId: prefix + "mblock off" },
          ],
        },
        {
          title: "📚 *AUTO MESSAGE READ*",
          rows: [
            { title: "📕 Read All Messages", rowId: prefix + "mread all" },
            { title: "📗 Read Cmd Only", rowId: prefix + "mread cmd" },
            { title: "❌ Read Messages Off", rowId: prefix + "mread off" },
          ],
        },
      ];

      const desc = `⚙️ \`SUHAS-MD BOT SETTINGS\` ⚙️
    
> ◈ *ᴏᴡɴᴇʀ:* ꜱᴜʜᴀꜱ ʙʀᴏ
> ◈ *ʙᴏᴛ ɴᴀᴍᴇ:* ꜱᴜʜᴀꜱ-ᴍᴅ
> ◈ *ᴠᴇʀꜱɪᴏɴ:* ᴠ.9.0.0
> ◈ *ᴛᴏᴛᴀʟ ᴄᴍᴅ:* 200+
> ◈ *ʙᴏᴛ ᴛʏᴘᴇ:* ᴡʜᴀᴛꜱᴀᴘᴘ
`;

      let listset = {
        text: desc,
        footer: config.FOOTER,
        title: "",
        buttonText: "*🔢 Reply below number*",
        sections,
      };
      await conn.listMessage(from, listset, mek);
    } catch (e) {
      reply("*❌ Error !!*");
      console.log(e);
    }
  }
);


const handleSettingUpdate = async (settingType, newValue, reply, alreadyMsg) => {
  const currentValue = await get(settingType);
  if (currentValue === newValue) {
    return await reply(alreadyMsg);
  }
  await input(settingType, newValue);
  await reply(`*${settingType.replace(/_/g, " ").toUpperCase()} updated: ${newValue}*`);
};

cmd(
  {
    pattern: "wtype",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      const workTypes = {
        me: "onlyme",
        group: "onlygroup",
        public: "public",
      };
      if (workTypes[q]) {
        await handleSettingUpdate("WORK_TYPE", workTypes[q], reply, alredy);
      }
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "creject",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await handleSettingUpdate("ANTI_CALL", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "allblock",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      const blockTypes = {
        all: "all",
        cmd: "cmd",
        off: "off",
      };
      if (blockTypes[q]) {
        await handleSettingUpdate("AUTO_BLOCK", blockTypes[q], reply, alredy);
      }
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "mblock",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await handleSettingUpdate("MOROCCO_BLOCK", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "antide",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await handleSettingUpdate("ANTI_DELETE", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "avoice",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await handleSettingUpdate("AUTO_VOICE", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "abio",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await handleSettingUpdate("AUTO_BIO", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "rstatus",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await handleSettingUpdate("AUTO_READ_STATUS", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "asr",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await handleSettingUpdate("AUTO_STATUS_REPLY", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "sreact",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await handleSettingUpdate("AUTO_STATUS_REACT", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "wapres",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      const presenceTypes = {
        composing: "composing",
        recording: "recording",
        available: "available",
        unavailable: "unavailable",
      };
      if (presenceTypes[q]) {
        await handleSettingUpdate("PRESENCE", presenceTypes[q], reply, alredy);
      }
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "read",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      const readTypes = {
        all: "all",
        cmd: "cmd",
        off: "off",
      };
      if (readTypes[q]) {
        await handleSettingUpdate("READ_MESSAGE", readTypes[q], reply, alredy);
      }
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

const updateSetting = async (settingType, newValue, reply, alreadyMsg) => {
  const currentValue = await get(settingType);
  if (currentValue === newValue) {
    return await reply(alreadyMsg);
  }
  await input(settingType, newValue);
  await reply(`*${settingType.replace(/_/g, " ").toUpperCase()} updated: ${newValue}*`);
};

cmd(
  {
    pattern: "apply",
    alias: ["set", "input"],
    desc: desc3,
    category: "owner",
    react: "📌",
    use: ".apply *<your text>*",
    filename: __filename,
  },
  async (conn, mek, m, { from, prefix, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      if (!q) return await reply(tesadtag);

      const sections = [
        {
          title: "*Change Upload Size* ⚙️",
          rows: [
            { title: "DEFAULT 🌝", rowId: `${prefix}uploadsz 200` },
            { title: "NEW 🌚", rowId: `${prefix}uploadsz ${q}` },
          ],
        },
        {
          title: "*Change Alive Message* ⚙️",
          rows: [
            { title: "DEFAULT 🌝", rowId: `${prefix}alivemg default` },
            { title: "NEW 🌚", rowId: `${prefix}alivemg ${q}` },
          ],
        },
        {
          title: "*Change Prefix* ⚙️",
          rows: [
            { title: "DEFAULT 🌝", rowId: `${prefix}setprefix .` },
            { title: "NEW 🌚", rowId: `${prefix}setprefix ${q}` },
          ],
        },
        {
          title: "*Change Alive Logo* ⚙️",
          rows: [
            { title: "DEFAULT 🌝", rowId: `${prefix}setlogo ${config.LOGO}` },
            { title: "NEW 🌚", rowId: `${prefix}setlogo ${q}` },
          ],
        },
	{
          title: "*Change Status Reply Massege* ⚙️",
          rows: [
            { title: "DEFAULT 🌝", rowId: `${prefix}statusmsg SUPER` },
            { title: "NEW 🌚", rowId: `${prefix}statusmsg ${q}` },
          ],
        },
        {
          title: "*Change Owner Number* ⚙️",
          rows: [
            { title: "DEFAULT 🌝", rowId: `${prefix}setnum ${config.OWNER}` },
            { title: "NEW 🌚", rowId: `${prefix}setnum ${q}` },
          ],
        },
      ];

      const listset = {
        text: `✨  \`SUHAS-MD BOT CONFIGS\` ✨`,
        footer: config.FOOTER,
        buttonText: "*🔢 Reply below number*",
        sections,
      };

      await conn.listMessage(from, listset, mek);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

//============================================================================================================

const handleAntiSetting = async (settingType, q, from, reply) => {
  const isAnti = async () => {
    const getdata = await get(settingType);
    return getdata.includes(from);
  };

  if (q === "on") {
    if (await isAnti()) return await reply(alredy);
    const olddata = await get(settingType);
    olddata.push(from);
    await input(settingType, olddata);
    await reply(`*${settingType.replace(/_/g, " ").toUpperCase()} updated: ${q}*`);
  } else {
    if (!(await isAnti())) return await reply(alredy);
    const array = await get(settingType);
    const indexToRemove = array.indexOf(from);
    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1);
    }
    await input(settingType, array);
    await reply(`*${settingType.replace(/_/g, " ").toUpperCase()} updated: ${q}*`);
  }
};

cmd(
  {
    pattern: "antilink",
    desc: "Antilink Feature",
    react: "⚙️",
    category: "owner",
    use: ".antilink" ,
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
      if (!isGroup) return await reply(ONLGROUP);
      if (!isAdmins) return await reply(ADMIN);
      if (!isBotAdmins) return await reply(ADMINim);
      await handleAntiSetting("ANTI_LINK", q, from, reply);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "antibot",
    desc: "AntiBot Feature",
    react: "⚙️",
    category: "owner",
    use: ".antibot" ,
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
      if (!isGroup) return await reply(ONLGROUP);
      if (!isAdmins) return await reply(ADMIN);
      if (!isBotAdmins) return await reply(ADMINim);
      await handleAntiSetting("ANTI_BOT", q, from, reply);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "antibad",
      desc: "Antibad Feature",
    react: "⚙️",
    category: "owner",
    use: ".antibad" ,
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
      if (!isGroup) return await reply(ONLGROUP);
      if (!isAdmins) return await reply(ADMIN);
      if (!isBotAdmins) return await reply(ADMINim);
      await handleAntiSetting("ANTI_BAD", q, from, reply);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "uploadsz",
    desc: "Uploadsz Feature",
    react: "⚙️",
    category: "owner",
    use: ".uploadsz" ,
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await updateSetting("MAX_SIZE", Number(q), reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "alivemg",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await updateSetting("ALIVE", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "statusmsg",
    desc: "Statusmsg Change Feature",
    react: "⚙️",
    category: "owner",
    use: ".statusmsg" ,
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await updateSetting("AUTO_STATUS_MSG", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "setprefix",
    desc: "Prefix Change Feature",
    react: "⚙️",
    category: "owner",
    use: ".setprefix" ,
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await updateSetting("PREFIX", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "setlogo",
    desc: "Change Logo in Bot",
    react: "⚙️",
    category: "owner",
    use: ".setlogo" ,
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await updateSetting("LOGO", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "setnum",
    desc: "Bot No Change Feature",
    react: "⚙️",
    category: "owner",
    use: ".setnum" ,
    dontAddCommandList: true,
    filename: __filename,
  },
  async (conn, mek, m, { from, q, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await updateSetting("OWNER", q, reply, alredy);
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "resetdb",
    desc: "Reset Database Feature",
    react: "⚙️",
    category: "owner",
    use: ".resetdb" ,
    desc: "It resets database.",
    category: "owner",
    use: ".resetdb - *Reset Your Database*",
    filename: __filename,
  },
  async (conn, mek, m, { from, isMe, reply }) => {
    try {
      if (!isMe) return await reply(BOTOW);
      await updfb();
      await upresbtn();
      return reply("Database Reseted !!");
    } catch (e) {
      reply("*Error !!*");
      console.log(e);
    }
  }
);
