import youtubeSearch, { YouTubeSearchOptions } from "youtube-search";
import { YoutubeAudio } from "../models/youtube-audio.model";
import play, { YouTubeStream } from 'play-dl';

export class YoutubeManager {

    static async searchVideo(query: string): Promise<YoutubeAudio | undefined> {
        const options: YouTubeSearchOptions = {
            maxResults: 1,
            key: process.env.YOUTUBE_API_TOKEN
        };

        const results = await youtubeSearch(query, options);

        if (!results || results.results.length === 0) {
            return undefined;
        }

        const youtubeAudio: YoutubeAudio = {
            url: results.results[0].link,
            title: results.results[0].title
        }

        return youtubeAudio;
    }

    static async getAudioStream(videoUrl: string): Promise<any> {
        const stream = await play.stream(videoUrl, {
            discordPlayerCompatibility: true
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        return (stream as YouTubeStream).stream;
    }

}