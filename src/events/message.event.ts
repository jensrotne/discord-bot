import { Message } from "discord.js";
import { CommandManager } from "../managers/command.manager";
import { BaseEvent } from "./base.event";

export class MessageEvent implements BaseEvent {

    constructor() {
        this.name = 'messageCreate';
        this.once = false;
    }

    name: string;
    once: boolean;

    execute(message: Message): void {
        if (message.author.bot) {
            setTimeout(() => { this.deleteMessage(message) }, 5000);
            return;
        }

        if (!message.content.startsWith('!')) {
            return;
        }

        setTimeout(() => { this.deleteMessage(message) }, 5000);

        const commandConstruction = CommandManager.deconstructCommandString(message.content);

        const command = CommandManager.getCommand(commandConstruction.command);
    
        if (command) {
            command.handler(message, ...commandConstruction.args);
        }
    }

    private async deleteMessage(message: Message): Promise<void> { 
        if (!message.guild?.me?.permissions.has('MANAGE_MESSAGES')) {
            return;
        }

        await message.delete();
    }

}