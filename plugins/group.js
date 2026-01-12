const config = require("../config");
const { cmd, commands } = require("../command");
const fs = require('fs');
const path = require('path');

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
const {
  getBinaryNodeChild,
  getBinaryNodeChildren,
} = require("@whiskeysockets/baileys");
const fetch = require("node-fetch");

const isAdminCheck = (isGroup, isBotAdmins, isAdmins, isDev, reply) => {
  if (!isGroup) return reply("🚫 *This command can only be used in a group!*");
  if (!isBotAdmins)
    return reply("🚫 *The bot must be an admin to execute this command!*");
  if (!isAdmins && !isDev)
    return reply("🚫 *Only admins or developers can use this command!*");
};

const sendMessage = async (conn, from, text, mek) => {
  await conn.sendMessage(from, { text }, { quoted: mek });
};

cmd(
  {
    pattern: "mute",
    react: "🔇",
    alias: ["close", "mute_gc"],
    desc: "Restrict message sending to admins only.",
    category: "group",
    use: ".mute",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, pushname, reply }
  ) => {
    try {
      if (isAdminCheck(isGroup, isBotAdmins, isAdmins, isDev, reply)) return;

      await conn.groupSettingUpdate(from, "announcement");
      sendMessage(
        conn,
        from,
        `🔇 *Group chat has been closed by Admin ${pushname}. Only admins can send messages now.*`,
        mek
      );
    } catch (e) {
      reply("⚠️ *An error occurred while muting the group.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "unmute",
    react: "🔊",
    alias: ["open", "unmute_gc"],
    desc: "Allow all members to send messages.",
    category: "group",
    use: ".unmute",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, pushname, reply }
  ) => {
    try {
      if (isAdminCheck(isGroup, isBotAdmins, isAdmins, isDev, reply)) return;

      await conn.groupSettingUpdate(from, "not_announcement");
      sendMessage(
        conn,
        from,
        `🔊 *Group chat has been opened by Admin ${pushname}. Everyone can send messages now.*`,
        mek
      );
    } catch (e) {
      reply("⚠️ *An error occurred while unmuting the group.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "lockgroup",
    react: "🔒",
    alias: ["lockgsettings"],
    desc: "Restrict editing group info to admins only.",
    category: "group",
    use: ".lockgs",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, pushname, reply }
  ) => {
    try {
      if (isAdminCheck(isGroup, isBotAdmins, isAdmins, isDev, reply)) return;

      await conn.groupSettingUpdate(from, "locked");
      sendMessage(
        conn,
        from,
        `🔒 *Group settings have been locked by Admin ${pushname}. Only admins can edit the group info.*`,
        mek
      );
    } catch (e) {
      reply("⚠️ *An error occurred while locking the group settings.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "unlockgroup",
    react: "🔓",
    alias: ["unlockgsettings"],
    desc: "Allow all members to edit group info.",
    category: "group",
    use: ".unlockgs",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, pushname, reply }
  ) => {
    try {
      if (isAdminCheck(isGroup, isBotAdmins, isAdmins, isDev, reply)) return;

      await conn.groupSettingUpdate(from, "unlocked");
      sendMessage(
        conn,
        from,
        `🔓 *Group settings have been unlocked by Admin ${pushname}. Everyone can edit the group info now.*`,
        mek
      );
    } catch (e) {
      reply("⚠️ *An error occurred while unlocking the group settings.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "leave",
    react: "👋",
    alias: ["left", "kickme"],
    desc: "Leave the group.",
    category: "group",
    use: ".leave",
    filename: __filename,
  },
  async (conn, mek, m, { from, isGroup, isMe, reply }) => {
    try {
      if (!isGroup || !isMe)
        return reply("🚫 *This command can only be used in a group!*");

      sendMessage(
        conn,
        from,
        `👋 *Goodbye everyone! I am leaving the group.*`,
        mek
      );
      await conn.groupLeave(from);
    } catch (e) {
      reply("⚠️ *An error occurred while leaving the group.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "updategname",
    react: "📝",
    alias: ["upgname", "gname"],
    desc: "Change the group name.",
    category: "group",
    use: ".updategname <new name>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, q, reply }
  ) => {
    try {
      if (isAdminCheck(isGroup, isBotAdmins, isAdmins, isDev, reply)) return;
      if (!q) return reply("🖊️ *Please provide the new group name.*");

      await conn.groupUpdateSubject(from, q);
      sendMessage(
        conn,
        from,
        `✔️ *Group name has been updated to:* _${q}_`,
        mek
      );
    } catch (e) {
      reply("⚠️ *An error occurred while updating the group name.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "updategdesc",
    react: "📝",
    alias: ["upgdesc", "gdesc"],
    desc: "Change the group description.",
    category: "group",
    use: ".updategdesc <new description>",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, q, reply }
  ) => {
    try {
      if (isAdminCheck(isGroup, isBotAdmins, isAdmins, isDev, reply)) return;
      if (!q) return reply("🖊️ *Please provide the new group description.*");

      await conn.groupUpdateDescription(from, q);
      sendMessage(
        conn,
        from,
        `✔️ *Group description has been updated to:* _${q}_`,
        mek
      );
    } catch (e) {
      reply("⚠️ *An error occurred while updating the group description.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "join",
    react: "📬",
    alias: ["joinme", "gc_join"],
    desc: "Join a group using an invite link.",
    category: "owner",
    use: ".join <group link>",
    filename: __filename,
  },
  async (conn, mek, m, { from, isCreator, q, reply }) => {
    try {
      if (!isCreator)
        return reply("🚫 *Only moderators can use this command!*");
      if (!q) return reply("🔗 *Please provide the group invite link.*");

      let result = q.split("https://chat.whatsapp.com/")[1];
      await conn.groupAcceptInvite(result);
      sendMessage(conn, from, `✔️ *Successfully joined the group!*`, mek);
    } catch (e) {
      reply("⚠️ *An error occurred while joining the group.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "invite",
    react: "🖇️",
    alias: ["grouplink", "glink"],
    desc: "Get the group invite link.",
    category: "group",
    use: ".invite",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, reply }
  ) => {
    try {
      if (!isGroup)
        return reply("🚫 *This command can only be used in a group!*");
      if (!isBotAdmins)
        return reply("🚫 *The bot must be an admin to execute this command!*");
      if (!isAdmins && !isDev)
        return reply("🚫 *Only admins or developers can use this command!*");

      const code = await conn.groupInviteCode(from);
      sendMessage(
        conn,
        from,
        `🖇️ *Group Link:* \n\nhttps://chat.whatsapp.com/${code}`,
        mek
      );
    } catch (e) {
      reply("⚠️ *An error occurred while retrieving the group link.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "revoke",
    react: "🔒",
    alias: ["revokegrouplink", "resetglink", "revokelink", "cyber_revoke"],
    desc: "Reset the group link.",
    category: "group",
    use: ".revoke",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, reply }
  ) => {
    try {
      if (!isGroup)
        return reply("🚫 *This command can only be used in a group!*");
      if (!isBotAdmins)
        return reply("🚫 *The bot must be an admin to execute this command!*");
      if (!isAdmins && !isDev)
        return reply("🚫 *Only admins or developers can use this command!*");

      await conn.groupRevokeInvite(from);
      sendMessage(conn, from, `🔒 *The group link has been reset.*`, mek);
    } catch (e) {
      reply("⚠️ *An error occurred while revoking the group link.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "kick",
    react: "🚫",
    alias: ["remove"],
    desc: "Remove a participant from the group.",
    category: "group",
    use: ".kick @user",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, mentionByTag, reply }
  ) => {
    try {
      if (!isGroup)
        return reply("🚫 *This command can only be used in a group!*");
      if (!isAdmins && !isDev)
        return conn.sendMessage(
          from,
          { text: "🚫 *Only admins can use this command!*" },
          { quoted: mek }
        );
      if (!isBotAdmins)
        return reply("🚫 *The bot must be an admin to execute this command!*");

      let who = m.quoted ? m.quoted.sender : mentionByTag[0];
      if (!who) return reply("🚫 *Couldn't find any user in context.*");

      await conn.groupParticipantsUpdate(from, [who], "remove");
      sendMessage(
        conn,
        from,
        `✔️ *Successfully removed the user from the group.*`,
        mek
      );
    } catch (e) {
      reply("⚠️ *An error occurred while removing the user.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "promote",
    react: "🌟",
    alias: ["addadmin"],
    desc: "Promote a participant to admin.",
    category: "group",
    use: ".promote @user",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, mentionByTag, reply }
  ) => {
    try {
      if (!isGroup)
        return reply("🚫 *This command can only be used in a group!*");
      if (!isAdmins && !isDev)
        return conn.sendMessage(
          from,
          { text: "🚫 *Only admins can use this command!*" },
          { quoted: mek }
        );
      if (!isBotAdmins)
        return reply("🚫 *The bot must be an admin to execute this command!*");

      let who = m.quoted ? m.quoted.sender : mentionByTag[0];
      if (!who) return reply("🚫 *Couldn't find any user in context.*");

      const groupAdmins = await getGroupAdmins(participants);
      if (groupAdmins.includes(who))
        return reply("🌟 *User is already an admin.*");

      await conn.groupParticipantsUpdate(from, [who], "promote");
      sendMessage(conn, from, `🌟 *User has been promoted to admin.*`, mek);
    } catch (e) {
      reply("⚠️ *An error occurred while promoting the user.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "demote",
    react: "🔻",
    alias: ["removeadmin"],
    desc: "Demote an admin to a member.",
    category: "group",
    use: ".demote @user",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, mentionByTag, reply }
  ) => {
    try {
      if (!isGroup)
        return reply("🚫 *This command can only be used in a group!*");
      if (!isAdmins && !isDev)
        return conn.sendMessage(
          from,
          { text: "🚫 *Only admins can use this command!*" },
          { quoted: mek }
        );
      if (!isBotAdmins)
        return reply("🚫 *The bot must be an admin to execute this command!*");

      let who = m.quoted ? m.quoted.sender : mentionByTag[0];
      if (!who) return reply("🚫 *Couldn't find any user in context.*");

      const groupAdmins = await getGroupAdmins(participants);
      if (!groupAdmins.includes(who))
        return reply("🔻 *User is not an admin.*");

      await conn.groupParticipantsUpdate(from, [who], "demote");
      sendMessage(conn, from, `🔻 *User has been demoted to member.*`, mek);
    } catch (e) {
      reply("⚠️ *An error occurred while demoting the user.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "tagall",
    react: "📣",
    alias: ["tag"],
    desc: "Tag all members in the group.",
    category: "group",
    use: ".tagall",
    filename: __filename,
  },
  async (conn, mek, m, { from, isGroup, isAdmins, reply, participants }) => {
    try {
      if (!isGroup)
        return reply("🚫 *This command can only be used in a group!*");
      if (!isAdmins)
        return conn.sendMessage(
          from,
          { text: "🚫 *Only admins can use this command!*" },
          { quoted: mek }
        );

      let teks = `☁ *𝐆𝐑𝐎𝐔𝐏 𝐍𝐎𝐓𝐈𝐅𝐘*\n\n`;
      participants.forEach((member) => {
        teks += `@${member.id.split("@")[0]} `;
      });

      await conn.sendMessage(
        from,
        { text: teks, mentions: participants.map((p) => p.id) },
        { quoted: mek }
      );
    } catch (e) {
      reply("⚠️ *An error occurred while tagging members.*");
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "ginfo",
    react: "🪔",
    alias: ["groupinfo"],
    desc: "Get group information.",
    category: "group",
    use: ".ginfo",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, isGroup, isBotAdmins, isAdmins, isDev, reply }
  ) => {
    try {
      if (!isGroup)
        return reply("⛔ *This command can only be used in a group.*");
      if (!isBotAdmins) return reply("⛔ *The bot must be an admin first.*");
      if (!isAdmins && !isDev)
        return reply("🚫 *You must be an admin to use this command.*");

      const metadata = await conn.groupMetadata(from);
      let ppUrl = await conn.profilePictureUrl(from, "image");
      const gdata = `\n*${metadata.subject}*

◈ *Group Jid* - ${metadata.id}

◈ *Participant Count* - ${metadata.size}

◈ *Group Creator* - ${metadata.owner}

◈ *Group Description* - ${metadata.desc || "No description available."}

> *© 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝚂𝚄𝙷𝙰𝚂  〽️𝙳*`;

      await conn.sendMessage(
        from,
        { image: { url: ppUrl }, caption: gdata },
        { quoted: mek }
      );
    } catch (e) {
      reply("⛔ *An error occurred while fetching group information.*\n\n" + e);
      console.log(e);
    }
  }
);

cmd(
  {
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "👏",
    dontAddCommandList: true,
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
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
      if (!isAdmins) return reply(`*⚠️ ONLY ADMINS CAN USE THIS CMD!*`);
      if (!isOwner)
        return reply(`*⚠️ SORRY ADMINS, YOU ARE NOT THE BOT OWNER!*`);

      if (!isGroup) return reply(`*🚫 This command is only for groups.*`);

      if (!isBotAdmins)
        return reply(`*⚠️ I NEED ADMIN PRIVILEGES TO KICK USERS!*`);

      const allParticipants = groupMetadata.participants;

      const nonAdminParticipants = allParticipants.filter(
        (member) => !groupAdmins.includes(member.id)
      );

      if (nonAdminParticipants.length === 0) {
        return reply("*✅ There are no non-admin members to kick.*");
      }

      for (let participant of nonAdminParticipants) {
        await conn.groupParticipantsUpdate(m.chat, [participant.id], "remove");
      }
      reply(`*✅ Successfully kicked all non-admin members from the group.*`);
    } catch (e) {
      console.error("Error kicking users:", e);
      reply(
        "*⚠️ An error occurred while trying to kick all members. Please try again.*"
      );
    }
  }
);

cmd(
  {
    pattern: "delete",
    react: "✅",
    alias: [","],
    desc: "delete message",
    category: "group",
    use: ".del",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
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
      const key = {
        remoteJid: m.chat,
        fromMe: false,
        id: m.quoted.id,
        participant: m.quoted.sender,
      };
      await conn.sendMessage(m.chat, { delete: key });
    } catch (e) {
      reply("*Error !!*");
      console.error(e);
    }
  }
);

const timeUnits = {
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000,
};

const handleTimeCommand = async (
  conn,
  mek,
  m,
  { from, args, isGroup, isAdmins, command, action }
) => {
  try {
    if (!isGroup) return reply(ONLGROUP);
    if (!isAdmins) return reply(ADMIN);

    const unit = args[1];
    const duration = args[0];

    if (!timeUnits[unit]) {
      return reply(
        "*Select:*\nsecond\nminute\nhour\nday\n\n*Example*\n10 second"
      );
    }

    const timer = duration * timeUnits[unit];
    reply(`${action} time ${duration} ${unit}(s) starting from now`);

    setTimeout(() => {
      const message = `*${action} time* the group was ${
        action === "Open" ? "opened" : "closed"
      } by admin\nnow ${
        action === "Open"
          ? "members can send messages"
          : "only admin can send messages"
      }`;
      conn.groupSettingUpdate(
        from,
        action === "Open" ? "not_announcement" : "announcement"
      );
      reply(message);
    }, timer);

    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
  } catch (e) {
    reply("*Error !!*");
    console.error(e);
  }
};

cmd(
  {
    pattern: "opentime",
    react: "🔖",
    desc: "To open group to a time",
    category: "group",
    use: ".opentime",
    filename: __filename,
  },
  (conn, mek, m, params) =>
    handleTimeCommand(conn, mek, m, { ...params, action: "Open" })
);

cmd(
  {
    pattern: "closetime",
    react: "🔖",
    desc: "To close group to a time",
    category: "group",
    use: ".closetime",
    filename: __filename,
  },
  (conn, mek, m, params) =>
    handleTimeCommand(conn, mek, m, { ...params, action: "Close" })
);

//group new in this

cmd({
    pattern: "broadcast",
    fromMe: true,
    desc: "📢 Broadcast a message to all chats",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    const message = args.join(" ");
    if (!message) return reply("❗ Please provide a message to broadcast.");

    const chats = await conn.getAllChats();
    let successCount = 0;

    for (let chat of chats) {
        try {
            await conn.sendMessage(chat.id, { text: `📢 *SUHAS-MD 💚 BROADCAST MESSAGE*\n\n${message}` });
            successCount++;
        } catch (error) {
            console.error(`Failed to send broadcast to ${chat.id}:`, error);
        }
    }

    reply(`✅ Broadcast sent to ${successCount} chats successfully!`);
});

//======================================================================================================================
cmd({
    pattern: "ban",
    fromMe: true,
    desc: "🚫 Ban a user from using the bot",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!args[0]) return reply("❗ Please provide a user's number to ban.");

    const userToBan = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    config.banned.push(userToBan);

    reply(`🚫 User ${args[0]} has been banned from using the bot.`);
});

//======================================================================================================================
cmd({
    pattern: "unban",
    desc: "✅ Unban a user",
    fromMe: true,
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!args[0]) return reply("❗ Please provide a user's number to unban.");

    const userToUnban = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    config.banned = config.banned.filter(user => user !== userToUnban);

    reply(`✅ User ${args[0]} has been unbanned.`);
});


//save in this
cmd({
    pattern: "save", 
    react: "📁",
    alias: ["sv"],
    desc: "Save and send back a media file (image, video, or audio).",
    category: "owner",
    use: ".save <caption>",
    filename: __filename,
},
async (conn, mek, m, { quoted, q, reply }) => {
    try {
        if (!quoted) {
            return reply("❌ Reply to a media message (video, image, or audio) with the `.save` command.");
        }

        const messageType = quoted.mtype;
        let mediaType;

        // Determine the type of media
        if (/video/.test(messageType)) {
            mediaType = "video";
        } else if (/image/.test(messageType)) {
            mediaType = "image";
        } else if (/audio/.test(messageType)) {
            mediaType = "audio";
        } else {
            return reply("❌ Only video, image, or audio messages are supported.");
        }

        // Download and save the media file
        const mediaPath = await conn.downloadAndSaveMediaMessage(quoted);
        const filePath = path.resolve(mediaPath);

        // Send the saved media back
        const mediaMessage = {
            caption: q || '',
        };
        mediaMessage[mediaType] = { url: `file://${filePath}` };

        await conn.sendMessage(m.sender, mediaMessage, { quoted: mek });
        await reply("✅ Successfully saved and sent the media file.");
    } catch (error) {
        console.error(error);
        reply("❌ Failed to save and send the media. Please try again.");
    }
});
