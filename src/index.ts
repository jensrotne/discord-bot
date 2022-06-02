import { Client, Intents } from "discord.js";
import { BaseEvent } from "./events/base.event";
import { FileManager } from "./managers/file.manager";
import dotenv from "dotenv";
dotenv.config();

const events: BaseEvent[] = FileManager.getInstancesOfTypeInDirectory(__dirname, 'events', 'event'); 

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