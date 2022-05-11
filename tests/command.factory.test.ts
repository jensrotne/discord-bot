import { CommandFactory } from "../src/commands/command.factory";

describe('CommandFactory tests', () => {
    it('should register targets', () => {
        const command = CommandFactory.getCommand('play');

        expect(command).toBeDefined();
    });
});