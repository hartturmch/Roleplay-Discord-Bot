const Discord = require('discord.js');
var fs = require('fs');
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

var aprovado = '✅';
var reprovado = '❌';

function delay(ms) {
    var cur_d = new Date();
    var cur_ticks = cur_d.getTime();
    var ms_passed = 0;
    while(ms_passed < ms) {
        var d = new Date();
        var ticks = d.getTime();
        ms_passed = ticks - cur_ticks;
    }
}

exports.run = async (client, message, args) => {
        
    if (args == "") {
        message.channel.send("```Use !sugestao + sua sugestao para que o comando funcione!```");
        return;
    }
    if (message.channel.id == '587023012943888387') {
        var d = new Date();
        var data = d.getDate() + " de " + monthNames[d.getMonth()] + " de " + d.getFullYear();
        var hora = d.getHours() + ":" + d.getMinutes();
        var userData = JSON.parse(fs.readFileSync('commands/userData.json', 'utf8'));
        var id = Object.keys(userData).length;
        
        const sugestaoembed = new Discord.RichEmbed()
            .setColor('#9c72ff')
            .setTitle('Nova sugestão')
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription('O usuario adicionou uma nova sugestão para a votacão de todos')
            .addField('Sugestão: ', message.content.substr(10, message.content.length), false)
            .addField('Use as reações abaixo para votar', "Sim: ✅ \n Não: ❌", false)
            .setFooter('Votacao iniciada as ' + hora + " do dia " + data);
        let msg = await message.channel.send(sugestaoembed);
        await msg.react(aprovado);
        delay(600);
        await msg.react(reprovado);
        userData[id] = {
            messageIdBot: msg.id,
            messageId: message.id,
            date: data,
            hour: hora
        }
        fs.writeFile('commands/userData.json', JSON.stringify(userData), (err) =>{
            if (err) console.error(err);
        });
    }else{
        message.channel.send("```Este comando so pode ser usado na sala #💡sugestões!```");
    }
}