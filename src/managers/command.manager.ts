import { BaseCommand } from "../commands/base.command";
import { FileManager } from "./file.manager";

export class CommandManager {

    private static commands: BaseCommand[] = [];
    private static hasRegisteredTargets = false;

    static getCommand(command: string): BaseCommand | undefined {
        CommandManager.registerTargets();
        return CommandManager.commands.find(commandImplementation => commandImplementation.name === command);
    }

    static deconstructCommandString(content: string): { command: string, args: string[] } {
        const indexOfExclamationMark = content.indexOf('!');

        const messageParts = content.substring(indexOfExclamationMark + 1).split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);

        const command = messageParts[0];

        let args: string[] = [];
        if (messageParts.length > 1) {
            args = messageParts.slice(1);
        }

        return { command, args };
    }

    static getRegisteredCommands(): BaseCommand[] {
        return CommandManager.commands;
    }

    private static registerTargets(): void {
        if (CommandManager.hasRegisteredTargets) {
            return;
        }

        CommandManager.commands = FileManager.getInstancesOfTypeInDirectory(__dirname, '../commands', 'command');

        CommandManager.hasRegisteredTargets = true;
    }

}