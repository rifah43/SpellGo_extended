// MTE2NTcxMzc4OTMwODY0OTU4Mg.GKAEHb.RmTWYQUoZe69Ykw5u6C32550Xqube72dtYAW6I

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const router = express.Router();
require('dotenv').config();


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.on('messageCreate', (message) => {
  if(message.author.bot) return;
  message.reply({ content: 'Hello to the world of Algorithm Learning!'});
});
client.login(`${process.env.DISCORD_TOKEN}`);
const messages = [];
  
  router.post('/user/send-message', (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).send('Message cannot be empty');
    }
  
    const channel_id = '1166056595738869823'; 
    if (client.readyAt) {
      const channel = client.channels.cache.get(channel_id);
  
    if (channel) {
      // console.log(channel);
      channel.send(message)
        .then(() => {
          messages.push(message);
          res.status(200).send('Message sent successfully');
        })
        .catch((error) => {
          console.error('Error sending message:', error);
          res.status(500).send('Error sending message');
        });
    } else {
      console.error('Channel not found');
      res.status(404).send('Channel not found');
    }
  }else {
      console.error('Bot client is not ready');
      res.status(500).send('Bot client is not ready');
    }
  });
  
  router.get('/user/get-messages', (req, res) => {
    res.status(200).json({ messages });
  });

module.exports = router;