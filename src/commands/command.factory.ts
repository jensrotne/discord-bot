import { BaseCommand } from "./base.command";
import { FileService } from "../services/file.service";

export class CommandFactory {

    private static commands: BaseCommand[] = [];
    private static hasRegisteredTargets: boolean = false;

    static getCommand(command: string): BaseCommand | undefined {
        CommandFactory.registerTargets();
        return CommandFactory.commands.find(commandImplementation => commandImplementation.name === command);
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
        if (CommandFactory.hasRegisteredTargets) {
            return;
        }

        CommandFactory.commands = FileService.getInstancesOfTypeInDirectory(__dirname, '', '.command.ts');

        CommandFactory.hasRegisteredTargets = true;
    }

}