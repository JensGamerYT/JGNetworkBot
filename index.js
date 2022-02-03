const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('WoW, dat voelt goed. Weer aan de slag met commandos uitvoeren 🤖'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);

const { Client, Intents, Collection } = require("discord.js");

const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for(const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`De file ${command.help.name}.js is geladen`);

}

client.once("ready", () => {
    console.log(`${client.user.username} is online.`);
    client.user.setActivity("-help", { type: "LISTENING" });

    const statusOptions = [
        "JGNetword Bot | *help",
        "Developed by Jens V.",
    ]

    let counter = 0;

    let time = 1 * 60 * 1000; //|1 Minuut.|
    //let time = 5 *1000;

    const updateStatus = () => {

        client.user.setPresence({

            status: "online",
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        });

        if(++counter >= statusOptions.length) counter = 0;

        setTimeout(updateStatus, time);
    }
    updateStatus();

});

client.on("messageCreate", async message => {
    
    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if(!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if(!commandData) return;

    var arguments = messageArray.slice(1);

    try{

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply("Er was een probleem tijdens het uitvoeren van deze command.");
        
    }

})

client.login(botConfig.token);