import youtubeSearch, { YouTubeSearchOptions } from "youtube-search";
import ytdl from "ytdl-core";

export class YoutubeManager {

    static async searchVideo(query: string): Promise<string | undefined> {
        const options: YouTubeSearchOptions = {
            maxResults: 1,
            key: process.env.YOUTUBE_API_TOKEN
        };

        const results = await youtubeSearch(query, options);

        if (!results || results.results.length === 0) {
            return undefined;
        }

        return results.results[0].link;
    }

    static async getAudioStream(videoUrl: string): Promise<any> {
        const stream = ytdl(videoUrl);
        
        return stream;
    }

}