const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
require('dotenv').config();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
    Intents.FLAGS.DIRECT_MESSAGES
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']
});
const express = require("express");
const fs = require("fs");

const app = express();
var listener = app.listen(process.env.PORT || 8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center>
  </body>`);
});

client.on('ready', () => {
  console.log(`✅ | Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'verify') {
    await interaction.reply('**Activated Developer Badge successfully ✅**');
  }
});
const commands = [
  new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Activate Badge Now!')
].map(command => command.toJSON());

const registerCommands = async () => {
  const response = await fetch(`https://discord.com/api/v9/applications/${process.env.id}/commands`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bot ${process.env.TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commands)
  });

  if (response.ok) {
    console.log('Successfully reloaded application (/) commands.');
  } else {
    console.error('Failed to register commands:', await response.text());
  }
};

registerCommands();




client.login(process.env.TOKEN);
