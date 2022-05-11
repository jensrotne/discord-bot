import { Message } from "discord.js";
import { CommandFactory } from "../commands/command.factory";
import { BaseEvent } from "./base.event";

export class MessageEvent implements BaseEvent {

    constructor() {
        this.name = 'messageCreate';
        this.once = false;
    }

    name: string;
    once: boolean;

    execute(message: Message): void {
        const commandConstruction = CommandFactory.deconstructCommandString(message.content);

        const command = CommandFactory.getCommand(commandConstruction.command);
    
        if (command) {
            command.handler(message, ...commandConstruction.args);
        }
    }

}