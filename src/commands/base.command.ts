import { Message } from "discord.js";

export interface BaseCommand {
    name: string;
    handler(message: Message, ...args: string[]): Promise<void>;
}


