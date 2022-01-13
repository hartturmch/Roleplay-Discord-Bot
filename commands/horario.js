const Discord = require('discord.js');
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
exports.run = (client, message, args) => {
    var dNow = new Date();
    var hora = dNow.getHours() + " horas, " + dNow.getMinutes() + " minutos e " + dNow.getSeconds() + " segundos";
    var data = dNow.getDate() + " de " + monthNames[dNow.getMonth()] + " de " + dNow.getFullYear();

    message.channel.send("```Agora sao exatamente " + hora + " do dia " + data + "```");
}