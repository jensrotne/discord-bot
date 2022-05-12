import { BaseCommand } from "../commands/base.command";
import { FileManager } from "./file.manager";

export class CommandManager {

    private static commands: BaseCommand[] = [];
    private static hasRegisteredTargets: boolean = false;

    static getCommand(command: string): BaseCommand | undefined {
        CommandManager.registerTargets();
        return CommandManager.commands.find(commandImplementation => commandImplementation.name === command);
    }

    static deconstructCommandString(content: string): { command: string, args: string[] } {
        const indexOfExclamationMark = content.indexOf('!');

        const messageParts = content.substring(indexOfExclamationMark + 1).split(' ');

        const command = messageParts[0];

        let args: string[] = [];
        if (messageParts.length > 1) {
            args = messageParts.slice(1);
        }

        return { command, args };
    }

    private static registerTargets(): void {
        if (CommandManager.hasRegisteredTargets) {
            return;
        }

        CommandManager.commands = FileManager.getInstancesOfTypeInDirectory(__dirname, '../commands', '.command.ts');

        CommandManager.hasRegisteredTargets = true;
    }

}