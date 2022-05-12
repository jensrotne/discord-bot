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
            return;
        }

        const commandConstruction = CommandManager.deconstructCommandString(message.content);

        const command = CommandManager.getCommand(commandConstruction.command);
    
        if (command) {
            command.handler(message, ...commandConstruction.args);
        }
    }

}