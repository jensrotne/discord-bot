import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";
import { BaseCommand } from "./base.command";

export class BjornHitsCommand implements BaseCommand {

    name: string = 'play';
    
    handler(message: Message<boolean>, fileName: string): Promise<void> {
        const connection = joinVoiceChannel({
            channelId: message.member?.voice.channel?.id as any,
            guildId: message.guild?.id as any,
            adapterCreator: message.guild?.voiceAdapterCreator as any,
        });

        const player = createAudioPlayer();

        let resourcePath = '';

        const soundResource = createAudioResource(resourcePath);

        player.play(soundResource);

        connection.subscribe(player);

        return Promise.resolve();
    }

}