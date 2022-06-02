import { AudioPlayer, AudioPlayerIdleState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, VoiceConnection } from "@discordjs/voice";
import { YoutubeManager } from "../managers/youtube.manager";
import { YoutubeAudio } from "../models/youtube-audio.model";
import { Queue } from "../structures/queue";
import { BasePlayer } from "./base.player";

export class YoutubePlayer implements BasePlayer {

    private queue: Queue<YoutubeAudio>;
    private isPlaying = false;
    private player: AudioPlayer | undefined;
    private connection: VoiceConnection | undefined;

    constructor(queue: Queue<YoutubeAudio>) {
        this.queue = queue;
    }

    play(): void {
        if (this.isPlaying) {
            return;
        }

        this.startPlaying();

        this.isPlaying = true;
    }

    stop(): void {
        this.player?.stop();
        this.queue.clear();
        this.connection?.disconnect();
        this.connection?.destroy();
        this.isPlaying = false;
    }

    skip(): void {
        this.nextSong();
    }

    private async startPlaying(): Promise<void> {
        this.player = this.player || createAudioPlayer();

        this.player.on(AudioPlayerStatus.Idle, async () => {
            await this.nextSong();
        });

        await this.nextSong();
    }
    private async nextSong(): Promise<void> { 
        if (this.connection && !this.queue.peek()) {
            this.connection.disconnect();
            this.stop();
        }

        const nextAudio = this.queue.pop();

        if (nextAudio) {
            this.connection = joinVoiceChannel({
                channelId: nextAudio.message?.member?.voice.channel?.id as any,
                guildId: nextAudio.message?.guild?.id as any,
                adapterCreator: nextAudio.message?.guild?.voiceAdapterCreator as any,
            });

            this.connection.subscribe(this.player!);

            const audioStream = await YoutubeManager.getAudioStream(nextAudio.url);

            const audioResource = createAudioResource(audioStream, {
                inputType: audioStream.type
            });

            this.player?.play(audioResource);
        }
    }

}