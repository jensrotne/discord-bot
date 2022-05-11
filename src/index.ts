import { Client, Intents } from "discord.js";
import { BaseEvent } from "./events/base.event";
import { FileService } from "./services/file.service";
require('dotenv').config();

const events: BaseEvent[] = FileService.getInstancesOfTypeInDirectory(__dirname, 'events', '.event.ts'); 

const apiToken = process.env.API_TOKEN;

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

events.forEach(event => {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(apiToken);