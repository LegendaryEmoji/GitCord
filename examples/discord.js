const { Client } = require("discord.js");
const GitCord = require("gitcord");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const cord = new GitCord("GITHUB_ACCOUNT_USERNAME", {
  repositories: ["...", "..."],
});

client.on("ready", () => {
  console.log("Connected to the discord, now ready for fight :D");
});

cord.on("start", () => {
  console.log("Connected to the github, now ready for war :D");
});

// "newEvent" will get triggered on every github event, meaning it will even get triggered on unknown events.
cord.on("newEvent", (eventData) => {
  // `eventData` is the unknown-parsed data, its recommended to use specific events to avoid confusion.
  client.channels.cache
    .get("LOGS_CHANNEL_ID")
    .send({ embeds: [eventData.embed] });
});

client.login("DISCORD_BOT_TOKEN");

// Same as `client.login()` but for GitCord.

cord.initialize();
