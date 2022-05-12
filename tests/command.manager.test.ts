import { CommandManager } from "../src/managers/command.manager";

describe('CommandManager tests', () => {
    it('should register targets', () => {
        const command = CommandManager.getCommand('play');

        expect(command).toBeDefined();
    });
});