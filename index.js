const discord = require("discord.js")
const botConfig = require("./botconfig.json");
 
const client = new discord.Client();
client.login(process.env.token)
 
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
 
    if (command === `${prefix}twitch`) {
        return message.channel.send("Mijn Twitch? https://www.twitch.tv/JensGamerLive !");
    }

    if (command === `${prefix}mcinfo`) {
        
        var botEmbet = new discord.MessageEmbed()
            .setColor("#ff0339")
            .addFields(
                {name: "IP:", value:"`play.jgserver.be`"},
                {name: "Available Versions:", value:"1.16.5"},
                {name: "Status:", value:"OFFLINE"},
            )
            .setFooter("JG | Network Bot", "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/a8415ba6cd7c3691a5ea49bdcc2ccf783ab93b55.png")    

        return message.channel.send(botEmbet);
            }

    if (command === `${prefix}help`) {
        
        var botEmbet = new discord.MessageEmbed()
            .setColor("003cff")
            .addFields(
                {name: "Twitch", value:"`*Twitch`"},
                {name: "Minecraft Info:", value:"*mcinfo"},
            )
            .setFooter("JG | Network Bot", "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/a8415ba6cd7c3691a5ea49bdcc2ccf783ab93b55.png")    

        return message.channel.send(botEmbet);
        }

        if (command === `${prefix}kick`) {
 
            const args = message.content.slice(prefix.length).split(/ +/);
     
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");
     
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");
     
            if (!args[1]) return message.reply("Geen gebruiker opgegeven.");
     
            if (!args[2]) return message.reply("Gelieve een redenen op te geven.");
     
            var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
     
            var reason = args.slice(2).join(" ");
     
            if (!kickUser) return message.reply("Kan de gebruiker niet vinden.");
     
            var embed = new discord.MessageEmbed()
                .setColor("#ff0000")
                .setThumbnail(kickUser.user.displayAvatarURL)
                .setFooter(message.member.displayName, message.author.displayAvatarURL)
                .setTimestamp()
                .setDescription(`** Gekickt:** ${kickUser} (${kickUser.id})
                **Gekickt door:** ${message.author}
                **Redenen: ** ${reason}`);
     
            var embedPrompt = new discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor("Gelieve te reageren binnen 30 sec.")
                .setDescription(`Wil je ${kickUser} kicken?`);
     
     
            message.channel.send(embedPrompt).then(async msg => {
     
                var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

                if(emoji === "✅") { 

                    msg.delete();

                    kickUser.kick(reason).catch(err => {
                        if (err) return message.reply("Er is iets foutelopen");
                    });

                    message.channel.send(embed);

                }else if(emoji === "❌"){

                    msg.delete();

                    (await message.reply("Kick geanuleerd")).attachments(m => m.delete(5000));

                }
    
            })

 
    }

});


async function promptMessage(message, author, time, reactions){

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    } 

    var filter = (reaction, user) => reaction.includes(reaction.emoji.name && user.id === author .id)

    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}
