#  Bot Discord Hetic

##  Présentation
**Bot Discord Hetic** est un bot développé pour offrir **des fonctionnalités avancées** de **modération**, de **gestion de contenu**, et de **divertissement**. Il est connecté à une API Express/MongoDB pour stocker les avertissements et autres informations.

## ✨ Fonctionnalités principales
- 🔨 **Modération** : Gestion des avertissements, bannissements, filtrage de langage.
- 🎵 **Divertissement** : Fonction de **blindtest**, affichage de texte en **ASCII**.
- 📚 **Tutos** : Recherche et affichage de tutoriels via une **API Express**.
- 🔧 **Commandes slash `/`** et **commandes préfixées `!`**.

---

 📥 Installation et Configuration

 1️⃣ **Cloner le projet**
```bash
git clone git@github.com:Abiola-lab/Bot_discord_Hetic.git
cd Bot_discord_Hetic

2️⃣ Créer et configurer .env

Crée un fichier .env à la racine et ajoute :

# Token et identifiants Discord
BOT_TOKEN=TON_BOT_TOKEN_ICI
CLIENT_ID=TON_CLIENT_ID_ICI
GUILD_ID=TON_GUILD_ID_ICI

# API et Base de données
API_URL=http://localhost:4000
MONGO_URI=mongodb://localhost:27017/hetixplorer

3️⃣ Installer les dépendances

npm install

4️⃣ Démarrer l’API

Dans discord-veille-api/ :

cd discord-veille-api
npm install
node index.js

5️⃣ Enregistrer les commandes Slash

Dans bot_discord/ :

cd bot_discord
node deploy-commands.js

6️⃣ Démarrer le bot

node bot.js

🎮 Utilisation

🔨 Commandes de Modération

Commande	Description
/warn @user	Donne un avertissement à un utilisateur.
/warnings @user	Affiche les avertissements d’un utilisateur.
/ban @user	Bannit un utilisateur après plusieurs avertissements.

🎵 Commandes Fun

Commande	Description
/ascii <texte>	Convertit du texte en ASCII.
/blindtest	Lance un blindtest musical.

📚 Commandes de Tutoriels

Commande	Description
/tuto <mot-clé>	Cherche un tutoriel spécifique.
/tutolist <mot-clé>	Affiche une liste de tutoriels.

🔧 Technologies utilisées
	•	Discord.js v14 🚀
	•	Node.js + Express.js 🛠️
	•	MongoDB (Mongoose) 🗄️
	•	Dépendances : figlet, ytdl-core, @discordjs/voice, dotenv, axios

📂 Structure du projet

📁 Bot_discord_Hetic
 ┣ 📂 bot_discord
 ┃ ┣ 📂 commands
 ┃ ┃ ┣ 📂 fun
 ┃ ┃ ┃ ┣ ascii.js
 ┃ ┃ ┃ ┣ blindtest.js
 ┃ ┃ ┣ 📂 moderation
 ┃ ┃ ┃ ┣ warn.js
 ┃ ┃ ┃ ┣ botwarning.js
 ┃ ┃ ┣ 📂 services
 ┃ ┃ ┃ ┣ warningService.js
 ┃ ┣ bot.js
 ┃ ┣ deploy-commands.js
 ┃ ┣ package.json
 ┣ 📂 discord-veille-api
 ┃ ┣ index.js
 ┃ ┣ models/
 ┃ ┣ routes/
 ┃ ┣ package.json
 ┣ 📂 extension-chrome
 ┃ ┣ manifest.json
 ┃ ┣ background.js
 ┃ ┣ content.js
 ┣ .env
 ┣ README.md

👨‍💻 Contribution
	1.	Fork le projet 🍴
	2.	Crée une branche (git checkout -b feature-ma-feature)
	3.	Fais tes modifications ✍️
	4.	Commit & Push (git commit -m "Ajout d'une nouvelle fonctionnalité" && git push origin feature-ma-feature)
	5.	Crée une pull request ✅

🎯 Auteurs
	•	@Abiola-lab 🚀 (Lead Dev)
	•	Collaborateurs : Nérilyne Chhem, Ryan Sellier

🎉 Support

📩 Tu as une question ou un problème ?
Ouvre une issue ou contacte-moi sur Discord !

🚀 Merci d’utiliser Bot Discord Hetic ! 🎮
