const discord = require("discord.js")
const botConfig = require("./botconfig.json");
 
const client = new discord.Client();
client.login(process.env.token);
 
client.on("ready", async () => {
 
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("JG | Network Bot | *help", { type: "PLAYING" });
 
});


client.on("message", async message => {
 
    if(message.author.bot) return;
 
    if(message.channel.type === "dm") return;
 
    var prefix = botConfig.prefix;
 
    var messageArray = message.content.split(" ");
 
    var command = messageArray[0];
 
    if (command === `${prefix}youtube`) {
        return message.channel.send("Dit is Jens zijn Kanaal: https://www.youtube.com/c/JensGamerYT !");
    }

    if (command === `${prefix}mcinfo`) {
        
        var botEmbet = new discord.MessageEmbed()
            .setColor("#ff0339")
            .addFields(
                {name: "IP:", value:"`play.jgserver.be`"},
                {name: "Available Versions:", value:"1.15.2 --> 1.16.3"},
                {name: "Status:", value:"OFFLINE"},
            )
            .setFooter("JG | Network Bot", "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/a8415ba6cd7c3691a5ea49bdcc2ccf783ab93b55.png")    

        return message.channel.send(botEmbet);
    }
    if (command === `${prefix}help`) {
        
        var botEmbet = new discord.MessageEmbed()
            .setColor("003cff")
            .addFields(
                {name: "YouTube", value:"`*YouTube`"},
                {name: "Minecraft Info:", value:"*mcinfo"},
            )
            .setFooter("JG | Network Bot", "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/a8415ba6cd7c3691a5ea49bdcc2ccf783ab93b55.png")    

        return message.channel.send(botEmbet);
    }    

});