const Discord = require('discord.js');
const mysql = require('mysql');

var vehicle = " ";
var bank = "N/A";
var wallet = "N/A";
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
    
    function carregarDados(query, id){
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            if(result != ""){                
                for (let i = 0; i < result.length; i++) {
                    vehicle += result[i].vehicle + ", ";
                }

                bank = result[0].bank;
                wallet = result[0].wallet;
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
                
                

        
                const rpinfo = new Discord.RichEmbed()
                    .setColor('#e5f442')
                    .setTitle('============+ Informacoes do ID '+ id + ' no RP +============')
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setDescription('Essas sao suas infos no servidor RP')
                    .addField('Nome do personagem: ', nome, true)
                    .addField('Idade do personagem: ', age, true)
                    .addField('Telefone: ', phone, true)
                    .addField('RG: ', registration, true)
                    .addBlankField()
                    .addField('Veiculos possuidos: ', vehicle, false)
                    .addField('Porte de arma: ', porte, false)
                    .addBlankField()
                    .addField('Dinheiro no banco: ', bank, true)
                    .addField('Dinheiro no bolso: ', wallet, true)
                    .addBlankField()
                    .addField('Ultimo login: ', last_login, false)
                    .setTimestamp()
                    .setFooter('Essas sao suas informacoes basicas no rp');
        
                const sucessinfo = new Discord.RichEmbed()
                    .setColor('#55ff37')
                    .setTitle('============+ Informacoes do ID '+ id + ' no RP +============')
                    .addField('As informacoes foram enviadas no privado para voce!', "🤫 ✅", true)
                    .setTimestamp()
                    .setFooter('Essas sao suas informacoes basicas no rp');
                
                vehicle = [];
                message.member.send(rpinfo);
                message.channel.send(sucessinfo);
                
            }else{
                message.channel.send("Usuario sem informacoes suficientes!");
            }
        });
    }


    var args = message.content.split(" ");

    if (message.member == null) return;
    
    if(message.member.roles.find(r => r.name === "🔰 | STAFF MOD" || r.name === "🔰 | STAFF ADMIN")){
        if(args[1]){
            id = args[1];
            query = "SELECT `vehicle`, `bank`, `wallet`, `phone`, `nome`, `sobrenome`, `age`, `last_login`, `registration`, `GunLicense` FROM `vrp_user_vehicles`, `vrp_user_moneys`, `vrp_users`, `vrp_user_identities` WHERE vrp_user_moneys.user_id = '" + id + "' AND vrp_user_vehicles.user_id = '" + id + "' AND vrp_users.id = '" + id + "' AND vrp_user_identities.user_id = '" + id + "'";
            carregarDados(query,id);
        }else{
            var getid =  message.guild.members.get(message.author.id).displayName.split("| ");
            id = getid[getid.length - 1];
            query = "SELECT `vehicle`, `bank`, `wallet`, `phone`, `nome`, `sobrenome`, `age`, `last_login`, `registration`, `GunLicense` FROM `vrp_user_vehicles`, `vrp_user_moneys`, `vrp_users`, `vrp_user_identities` WHERE vrp_user_moneys.user_id = '" + id + "' AND vrp_user_vehicles.user_id = '" + id + "' AND vrp_users.id = '" + id + "' AND vrp_user_identities.user_id = '" + id + "'";
            carregarDados(query,id);
        }        
    } else {
        if(args[1]){
            message.channel.send("```Voce nao tem permissao para ver informacoes de outro id, para ver suas proprias informacoes use apenas !rp```");
        }else{
            var texto = message.guild.members.get(message.author.id).displayName;
            var regex = new RegExp(/\[(\w+)\]/gm);
            var result = regex.exec(texto);
            if(result){
                id = result[1];
                query = "SELECT `vehicle`, `bank`, `wallet`, `phone`, `nome`, `sobrenome`, `age`, `last_login`, `registration`, `GunLicense` FROM `vrp_user_vehicles`, `vrp_user_moneys`, `vrp_users`, `vrp_user_identities` WHERE vrp_user_moneys.user_id = '" + id + "' AND vrp_user_vehicles.user_id = '" + id + "' AND vrp_users.id = '" + id + "' AND vrp_user_identities.user_id = '" + id + "'";
                carregarDados(query,id);
            }else{
                message.channel.send("```Voce nao esta na whitelist, use o canal #📋solicite-whitelist para liberar whitelist```");
            }
        }
    }

}