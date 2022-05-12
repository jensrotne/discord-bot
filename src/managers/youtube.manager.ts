import youtubeSearch, { YouTubeSearchOptions } from "youtube-search";
import ytdl from "ytdl-core";
import { YoutubeAudio } from "../models/youtube-audio.model";

export class YoutubeManager {

    static async searchVideo(query: string): Promise<YoutubeAudio | undefined> {
        const options: YouTubeSearchOptions = {
            maxResults: 1,
            key: process.env.YOUTUBE_API_TOKEN
        };

        const results = await youtubeSearch(query, options);

        if (!results || results.results.length === 0) {
            return undefined;
        }

        const youtubeAudio: YoutubeAudio = {
            url: results.results[0].link,
            title: results.results[0].title
        }

        return youtubeAudio;
    }

    static async getAudioStream(videoUrl: string): Promise<any> {
        const stream = ytdl(videoUrl, {
            requestOptions: {
                headers: {
                    cookie: process.env.YOUTUBE_COOKIE
                }
            }
        });
        
        return stream;
    }

}