import { Message } from "discord.js";
import { CommandManager } from "../managers/command.manager";
import { BaseCommand } from "./base.command";

export class HelpCommand implements BaseCommand {
    name: string = 'help';
    handler(message: Message<boolean>): Promise<void> {
        const registeredCommands = CommandManager.getRegisteredCommands();

        let helpText = '```\n';
        registeredCommands.forEach(command => {
            helpText += `${command.name}:\n${command.getHelpText()}\n\n`;
        });

        message.channel.send(helpText + '```');

        return Promise.resolve();
    }

    getHelpText(): string {
        return 'Get a list of commands.';
    } 

}