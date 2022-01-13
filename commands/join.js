const Discord = require('discord.js');
exports.run = (client, message, args) => {
    if(message.member.roles.find(r => r.name === "🔰 | STAFF MOD" || r.name === "🔰 | STAFF ADMIN")){
         if(message.member.voiceChannel){
             if(!message.guild.voiceConnection){
                 message.member.voiceChannel.join()
                    .then(connection => {
                        message.reply("Connect!")
                    })
             }
         }
    } else {
        message.channel.send("```Voce nao tem permissao!```");
    }
}