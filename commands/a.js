
exports.run = (client, message, args) => {
    var tamanho = message.content.substr(10, message.content.length);
    message.channel.send(tamanho);
}