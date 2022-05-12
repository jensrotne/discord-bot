import { Message } from "discord.js";

export interface YoutubeAudio {
    title: string;
    url: string;
    message?: Message;
    requestedBy?: string;
}