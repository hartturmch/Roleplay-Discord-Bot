const Discord = require('discord.js');
const mysql = require('mysql');
const client = new Discord.Client();
const fs = require('fs');
const CronJob = require('cron').CronJob;
var aprovado = '✅';
var reprovado = '❌';
const token = 'NTg3NjgzNDM1NTkwNzEzMzcx.XP6Jig.fDnr1imWR4pSS2Yn0LMVTLQc0t4';


var prefix = "!";

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "parcas"
});
function editWl(id, status){    
    var sql = "UPDATE `vrp_users` SET `whitelisted`= '"+ status +"' WHERE `id` = '"+ id +"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        
    });
    
}


client.on('ready', () => {
    var type = ['PLAYING', 'STREAMING', 'LISTENING', 'WATCHING'];
    var name = ['!comandos para ver comandos'];

    console.log('O Pai ta online!!');
    //client.channels.get("576202695656865827").send("O Pai ta online!!");
    client.user.setStatus('available');
    setInterval(() => {
        client.user.setPresence({
            game: {
                name: name[Math.floor(Math.random() * name.length)],
                type: type[Math.floor(Math.random() * type.length)],
                url: "https://www.twitch.tv/stane4m"
            }
        });
    }, 15000);
    var avatar = "parcas.png";
    setInterval(() => {
        if (avatar == "parcas.png") {
            avatar = "4.png";
        }else{
            avatar = "parcas.png";
        }
        client.user.setAvatar("imagens/" + avatar);
    }, 610000);
    try {
        //
        var job = new CronJob('0 0 0 * * *', async () =>{
            var userData = JSON.parse(fs.readFileSync('commands/userData.json', 'utf8'));
            if (!userData[0]) return;
            
            client.channels.get('587023012943888387').send("```Lembrete: Use !sugestao + sua sugestao para abrir votação para sua sugestão```");

            for (let i = 0; i < Object.keys(userData).length; i++) {
                var mensagem = userData[i].messageId;
                var mensagemBot = userData[i].messageIdBot;
                
                let msgone = await client.channels.get('587023012943888387').fetchMessage(mensagem);
                let msgtwo = await client.channels.get('587023012943888387').fetchMessage(mensagemBot);
                
                var hora = userData[i].hour;
                var data = userData[i].date;

                var messageAuthor = msgone.author;
                var contet = msgone.content.substr(6, msgone.content.length);
                var aprovados = msgtwo.reactions.filter(a => a.emoji.name == aprovado).map(reaction => reaction.count)[0];
                var reprovados = msgtwo.reactions.filter(a => a.emoji.name == reprovado).map(reaction => reaction.count)[0];
                
                if(aprovados > reprovados){
                    var color = "#45f442";
                    var status = "aprovada";
                }else if(aprovados == reprovados){
                    var color = "#f4e841";
                    var status = "empatada, passará sob votação da staff";
                }else if(aprovados == 1 && reprovados == 1){
                    var color = "#f4e841";
                    var status = "sem votos";
                }else if(aprovados < reprovados){
                    var color = "#f44141";
                    var status = "reprovada";
                }

                const resultEmbed = new Discord.RichEmbed()
                    .setColor(color)
                    .setTitle('Resultado da sugestão')
                    .setAuthor(messageAuthor.username, messageAuthor.avatarURL)
                    .addField('Sugestão: ', contet, false)
                    .addField('Resultado da sugestão de ' + messageAuthor.username, "Sugestão " + status + "!", false)
                    .addField('Votos: ', "Aprovação: " + aprovados + "\nReprovados: " + reprovados, false)
                    .setFooter('Votacao iniciada as ' + hora + " do dia " + data);
                    client.channels.get('589957036536758293').send(resultEmbed);
                
            }
            fs.writeFile('commands/userData.json', '{}', (err) =>{
                client.channels.get("589954451834667037").send("```" + err + "```");
            });        
        }, null, true, 'America/Sao_Paulo');
        
        job.start();
    
    } catch (err) {
        client.channels.get("589954451834667037").send("```"+ err +"```");
    }
});

client.on('message', message => {
    try {
        let msg = message.content.toUpperCase();
        let args = message.content.slice(prefix.length).trim().split(' ');
        let cmd = args.shift().toLowerCase();

        
        if (message.author.bot) return;
        if (message.member == null) return;

        if (message.channel.id == '561529645707689987') {
            if (isNaN(message.content)) {
                message.channel.send("Erro: ID invalido, por favor entenda que eu sou um bot e nao sei ler muito bem, mande apenas o id. ```Ex: 1234```").catch(err => client.channels.get('589954451834667037').send("```"+ err +"```"));
            } else{
                if(message.content.length > 4){
                    message.channel.send("Erro: ID invalido, por favor entenda que eu sou um bot e nao sei ler muito bem, mande apenas o id. ```Ex: 1234```").catch(err => client.channels.get('589954451834667037').send("```"+ err +"```"));
                }else{
                    editWl(message.content, "1");
                    var guildMember = message.member;
                    var role = message.guild.roles.find(x => x.name, '🏙️ | CIDADÃO');
                    message.react('✅');
                    message.channel.send(message.author + " voce foi aprovado na WL, Bom RP ```Importante: Leia as regras```").catch(err => client.channels.get('589954451834667037').send("```"+ err +"```"));
                    guildMember.addRole(role);
                    message.member.setNickname("[" + message.content +"] " + message.author.username).catch(err => client.channels.get("589954451834667037").send("```"+ err +"```"));
                }
            }
            
        }

        var dNow = new Date();
        var expressoes = [' meu consagrado!', ' razão da minha libido!', ' gay!', ' viado!', ' GAYmer!', ' fake!', ' NooB!', ' delicia!', ' miga, sua loca!', ' crush!', ' falsiane!', ' trouxa!', ', e o cu ja deu hoje?', ' quer namorar cmg?'];
        var expressao = expressoes[Math.floor(Math.random() * expressoes.length)];
        if (message.content.toLowerCase().match(/bom dia/) || message.content.toLowerCase().match(/boa tarde/) || message.content.toLowerCase().match(/boa noite/) || message.content.toLowerCase().match(/boa madrugada/)){
            if (dNow.getHours() >= 6 && dNow.getHours() < 11){
                message.channel.send("Bom dia" + expressao).catch(err => client.channels.get("589954451834667037").send("```"+ err +"```"));
            }else if (dNow.getHours() >= 11 && dNow.getHours() < 18){
                message.channel.send("Boa tarde" + expressao).catch(err => client.channels.get("589954451834667037").send("```"+ err +"```"));
            }else if (dNow.getHours() >= 18 && dNow.getHours() < 0){
                message.channel.send("Boa noite" + expressao).catch(err => client.channels.get("589954451834667037").send("```"+ err +"```"));
            }else if (dNow.getHours() >= 0 && dNow.getHours() < 6){
                message.channel.send("Boa madrugada" + expressao).catch(err => client.channels.get("589954451834667037").send("```"+ err +"```"));
            }else{
                message.channel.send("Oi!").catch(err => client.channels.get("589954451834667037").send("```"+ err +"```"));
            }
        }

        if (!msg.startsWith(prefix)) return;
        try{
            fs.readFile(`./commands/${cmd}.js`, function(err,data){
                if(err) {
                    message.channel.send("```Erro: Comando invalido!```")
                    
                }else{
                    let commandFile = require(`./commands/${cmd}.js`);
                    commandFile.run(client, message, args);
                }
                
            });
        } catch (e) {
            console.log(e.message);
        }
    } catch (err) {
        client.channels.get("589954451834667037").send("```"+ err +"```");
    }
});
client.on('guildMemberAdd', member => {
    try{
        member.user.send('```❤️❤️ Bem vindo ao servidor do parcas RP ❤️❤️```\n`🕑 Staff: 24h online`\n`✔️ RP: 100% atualizado`\n`🆔 Whitelist: extremamente rápida`\n`🔥 Comandos no discord exclusivos`\n`🗳️ Votações para sugestões de novas funcionalidades no rp`\n`➕ e muito mais...`\n```📋Para liberar seu ID na whitelist mande apenas o ID na sala 📋solicite-whitelist```', {files: ["./imagens/4.png"]});
    } catch (err) {
        client.channels.get("589954451834667037").send("```"+ err +"```");
    }
});
client.on('guildMemberRemove', member => {
    try{
        var guild = client.guilds.get('337060994876571648');
        var texto = member.nickname;
        var regex = new RegExp(/\[(\w+)\]/gm);
        var result = regex.exec(texto);
        if(result){
            var id = result[1];
            editWl(id, "0");

            guild.channels.get('588053291460591679').send("```O usuario " + member.user.username + " saiu do servidor e perdeu a whitelist do ID: " + id + "```");    
        }else{
            guild.channels.get('588053291460591679').send("```O usuario " + member.user.username + " saiu do servidor mas ele nao estava na whitelist.```");    
        }
    } catch (err) {
        client.channels.get("589954451834667037").send("```Erro:  "+ err +"```");
    }
});
client.on('guildMemberAvailable', member =>{
    console.log(member.nickname);
})


client.on("error", (e) => {
    client.channels.get("589954451834667037").send("```Error:  "+ e +"```");
});
client.on("warn", (e) => {
    client.channels.get("589954451834667037").send("```Warn:  "+ e +"```");
});

client.on('guildMemberSpeaking', (member, speaking) => {
    let guild = member.guild;
    if (member.speaking) {
        client.channels.get("587684896596688908").send(`${member.user.username} is speaking!`);
    }
});

client.login(token);