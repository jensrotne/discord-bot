import { YoutubeManager } from "../src/managers/youtube.manager";

require('dotenv').config();

describe('YoutubeManager tests', () => {
    it('Should find video', async () =>{
        const searchString = 'happier';

        const video = await YoutubeManager.searchVideo(searchString);

        expect(video).toBeDefined();
        expect(video?.url).toBe('https://www.youtube.com/watch?v=m7Bc3pLyij0');
    });

    it('Should return stream on valid url', async () => {
       const url = 'https://www.youtube.com/watch?v=m7Bc3pLyij0';
       
       const stream = await YoutubeManager.getAudioStream(url);

       expect(stream).toBeDefined();

       stream.destroy();
    });
});