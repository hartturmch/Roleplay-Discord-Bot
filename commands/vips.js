const Discord = require('discord.js');
const mysql = require('mysql');


exports.run = (client, message, args) => {
    message.member.send("oi.", {files: ['./imagens/Donates.png', './imagens/Donates_Gold.png', './imagens/Donates_Platina.png', './imagens/Donates_Diamante.png']});
}