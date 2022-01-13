const Discord = require('discord.js');
const mysql = require('mysql');


exports.run = (client, message, args) => {
    message.channel.send(message.member);
}