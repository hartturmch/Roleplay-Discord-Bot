const token = 'NTg3NjgzNDM1NTkwNzEzMzcx.XP6Jig.fDnr1imWR4pSS2Yn0LMVTLQc0t4';


exports.run = (client, message, args) => {
    if(message.member.roles.find(r => r.name === "🔰 | STAFF MOD" || r.name === "🔰 | STAFF ADMIN")){
        if(args[1]){
            message.channel.send('Resetando o bot... \n`Motivo: ' + message.content.substr(7, message.content.length) + '`')
                .then(msg => client.destroy())
                .then(() => client.login(token));
        }else{
            message.channel.send('Resetando o bot...')
                .then(msg => client.destroy())
                .then(() => client.login(token));
        }        
    } else {
        message.channel.send("```Voce nao tem permissao!```");
    }

}