import { Message } from "discord.js";
import { PlayerManager } from "../managers/player.manager";
import { QueueManager } from "../managers/queue.manager";
import { YoutubeManager } from "../managers/youtube.manager";
import { YoutubeAudio } from "../models/youtube-audio.model";
import { BasePlayer } from "../players/base.player";
import { Queue } from "../structures/queue";
import { BaseCommand } from "./base.command";

export class YoutubeCommand implements BaseCommand {

    private queue: Queue<YoutubeAudio> = QueueManager.getQueue('youtube');

    name: string = "youtube";

    async handler(message: Message<boolean>, command: string, arg: string): Promise<void> {
        if (!message?.member?.voice.channel?.id) {
            message.channel.send("You must be in a voice channel to use this command.");
            return;
        }
        let player: BasePlayer | undefined = PlayerManager.getPlayer('youtube');
        switch (command) {
            case 'play':
                
                const audio = await YoutubeManager.searchVideo(arg);
                if (audio) {
                    audio.requestedBy = message.author.username;
                    audio.message = message;
                    this.queue.push(audio);

                    if (player) {
                        player.play();
                        message.channel.send(`Added ${audio.title} to the queue.`);
                    }

                } else {
                    message.channel.send('No results found.');
                }
                break;
            case 'queue':
                let responseString = '```';

                this.queue.forEach((audio, index) => { 
                    responseString += `${index + 1}. ${audio.title}. Requested by ${audio.requestedBy}\n`;
                });

                responseString += '```';

                message.channel.send(responseString);
                break;
            case 'skip':
                if (player) {
                    player.skip();
                }
                break;
            case 'stop':
                if (player) {
                    player.stop();
                }
        }
    }
}