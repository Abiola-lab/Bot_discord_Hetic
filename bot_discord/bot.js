const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();

// Créer un client Discord avec les intentions requises
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

// Collection pour stocker les commandes
client.commands = new Collection();

// 📂 **Charger toutes les commandes**
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

for (const folder of commandFolders) {
    const folderPath = path.join(__dirname, 'commands', folder);
    
    // Vérifier si c'est un dossier ou un fichier
    if (fs.statSync(folderPath).isDirectory()) {
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`);
            if (command.data && command.execute) {
                client.commands.set(command.data.name, command);
            }
        }
    } else if (folder.endsWith(".js")) {
        const command = require(`./commands/${folder}`);
        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
        }
    }
}

console.log(`✅ ${client.commands.size} commandes chargées.`);

// 📡 **Quand le bot est prêt**
client.once(Events.ClientReady, () => {
    console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

// 📩 **Gestion des messages**
client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;

    console.log(`💬 Message reçu : "${message.content}" par ${message.author.tag}`);

    // ⚠️ **Filtrage des mots interdits**
    const forbiddenWords = ["ta gueule", "merde", "salope", "con"];
    if (forbiddenWords.some(word => message.content.toLowerCase().includes(word))) {
        await message.delete();
        await message.channel.send(`⚠️ **${message.author.tag}**, attention à votre langage, vous risquez un avertissement !`);
        return;
    }

    // 🚀 **Gestion des commandes (préfixe `!` ou `/`)**
    const prefix = "!";  // Modifier si nécessaire
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) {
        return message.channel.send("❌ Commande inconnue.");
    }

    try {
        await command.execute(message, args);
        console.log(`✅ Commande exécutée : ${commandName} par ${message.author.tag}`);
    } catch (error) {
        console.error(`❌ Erreur lors de l'exécution de ${commandName}:`, error);
        message.channel.send("⚠️ Une erreur est survenue lors de l'exécution de la commande.");
    }
});

// 🚀 **Gestion des commandes Slash**
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`❌ Aucune commande trouvée pour ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
        console.log(`✅ Slash Command exécutée : ${interaction.commandName}`);
    } catch (error) {
        console.error(`❌ Erreur lors de l'exécution de la commande ${interaction.commandName}:`, error);
        await interaction.reply({ content: "⚠️ Une erreur est survenue lors de l'exécution de la commande.", ephemeral: true });
    }
});

// 📌 **Connexion du bot**
client.login(process.env.BOT_TOKEN);
