exports.run = (client, message, args) => {
    if(message.member.roles.find(r => r.name === "🔰 | STAFF MOD" || r.name === "🔰 | STAFF ADMIN")){
        if(args[1]){
            message.channel.send(message.content.substr(6, message.content.length));
        }else{
            message.channel.send('Mensagem de teste!');
        }        
    } else {
        message.channel.send("```Voce nao tem permissao!```");
    }

}