const Discord = require('discord.js');
const mysql = require('mysql');

var vehicle = " ";
var phone = "N/A";
var nome = "N/A";
var age = "N/A";
var last_login = "N/A";
var registration = "N/A";
var porte = "N/A"

var id;
var query;

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "parcas"
});

exports.run = (client, message, args) => {
    
    
    function carregarDadosPM(query, id){
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                vehicle += result[i].vehicle + ", ";
            }
            phone = result[0].phone;
            nome = result[0].nome + " " + result[0].sobrenome;
            age = result[0].age;
            last_login = result[0].last_login;
            registration = result[0].registration;
            if (result[0].GunLicense == 'Required'){
                porte = "Nao Possui!";
            }else{
                porte = "Possui!";
            }
            

    
            const pminfo = new Discord.RichEmbed()
                .setColor('#e5f442')
                .setTitle('============+ Informacoes do ID '+ id + ' no RP +============')
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription('Essa e a ficha do usuario no RP')
                .addField('Nome do personagem: ', nome, true)
                .addField('Idade do personagem: ', age, true)
                .addField('Telefone: ', phone, true)
                .addField('RG: ', registration, true)
                .addBlankField()
                .addField('Veiculos possuidos: ', vehicle, false)
                .addField('Porte de arma: ', porte, true)
                .addBlankField()
                .addField('[Fora RP] Ultimo login: ', last_login, false)
                .setTimestamp()
                .setFooter('Essa e a ficha do usuario no RP');
    
            const sucessinfopm = new Discord.RichEmbed()
                .setColor('#55ff37')
                .setTitle('============+ Informacoes do ID '+ id + ' no RP +============')
                .addField('A ficha foi enviada no privado para voce!', "🤫 ✅", true)
                .setTimestamp()
                .setFooter('Essa e a ficha do usuario no RP');
            
            vehicle = [];
            message.member.send(pminfo);
            message.channel.send(sucessinfopm);
        });
    }


    var args = message.content.split(" ");

    if (message.member == null) return;
    
    if(message.member.roles.find(x => x.name === "🚨 | STATE POLICE")){
        if(args[1]){
            id = args[1];
            query = "SELECT `vehicle`, `phone`, `nome`, `sobrenome`, `age`, `last_login`, `registration`, `GunLicense` FROM `vrp_user_vehicles`, `vrp_users`, `vrp_user_identities` WHERE vrp_user_vehicles.user_id = '"+ id +"' AND vrp_users.id = '"+ id +"' AND vrp_user_identities.user_id = '"+ id +"'";
            carregarDadosPM(query,id);
        }else{
            message.channel.send("```Informe o ID! Ex: !ficha 1234```");            
        }
    }else {
        message.channel.send("```Voce nao tem permissao para isso!```");
    }

}