# GitCord

<p align="center">
<img align="center" style="width:1px" src="https://cdn.discordapp.com/attachments/675669552796925987/836722446693826610/logo.png"/>
</p>
<br/>
<p align="center">
  <a href="https://withwin.in/dbd"><img src="https://badgen.net/discord/online-members/7SFVH6yUuE" alt="Discord"></a>
</p>

> Work with Github feeds efficiently, specifically made for discord bots.

## Features

- Easy, simple & efficient
- Can be used in many other projects other than discord bots
- Upto 50 repositories feeds (supports "all" option to get rid of long-chain)
- Detailed & beginner-friendly documentation
- Supports 90% of the events

## Example

```js
const GitCord = require("gitcord");
// You can pass options in the constructor
// "token" is used for setting your Github token, increases requests limit
// "all" is used for getting all the repositories, upto 50 repositories
const cord = new Github("GITHUB_ACCOUNT_USERNAME", {
  token: "GITHUB_TOKEN",
  repositories: ["...", "..."],
  all: false,
});

cord.on("start", (data) => doSomethingWithData(data));
cord.on("newEvent", (data) => doSomethingWithData(data));
cord.on("repositoryCreate", (data) => doSomethingWithData(data));

cord.initialize();
```

## 🐱‍🏍 How to use on Discord ?

```js
const { Client } = require("discord.js");
const GitCord = require("gitcord");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const cord = new GitCord("GITHUB_ACCOUNT_USERNAME", {
  token: "GITHUB_TOKEN",
  repositories: ["...", "..."],
});

client.on("ready", () => {
  console.log("Connected to the discord, now ready for fight :D");
});

cord.on("start", () => {
  console.log("Connected to the github, now ready for war :D");
});

// "newEvent" gets triggered on every github event
// meaning it will even get triggered on unknown events.
cord.on("newEvent", (eventData) => {
  // `eventData` is the unknown-parsed data
  // its recommended to use specific events to avoid confusion and issues.
  client.channels.cache
    .get("LOGS_CHANNEL_ID")
    .send({ embeds: [eventData.embed] });
});

client.login("DISCORD_BOT_TOKEN");

// Same as `client.login()` but for GitCord.

cord.initialize();
```

## Miscellaneous

- 📃 Documentation: Check Wiki
- 🗝 Modules used: [axios](https://www.npmjs.com/package/axios)
- 🎇 Sponser: Download riad shadaw legexds!!!!
- ✨ Links: [Discord](https://withwin.in/dbd), [Youtube](https://www.youtube.com/channel/UClAFgotVhZ1DGvN57EMY7fA)
