import fs from 'fs';
import path from 'path';

export class FileManager {

    static getInstancesOfTypeInDirectory<T>(currentPath: string, relativePath: string, fileType: string): T[] {
        const searchDirectoryPath = path.join(currentPath, relativePath);
        
        const commandFiles = fs.readdirSync(searchDirectoryPath).filter(file => file.indexOf(fileType) !== -1 && (file.endsWith('.ts') || file.endsWith('.js')));
        const instances: T[] = [];

        for (const file of commandFiles) {
            if (file.indexOf('base') !== -1) {
                continue;
            }

            const commandFilePath = path.join(searchDirectoryPath, file);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command = require(commandFilePath);

            instances.push((new command[Object.keys(command)[0]]));
        }

        return instances;
    }

}