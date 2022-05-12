import { BasePlayer } from "../players/base.player";
import { YoutubePlayer } from "../players/youtube.player";
import { QueueManager } from "./queue.manager";

export class PlayerManager {

    private static players: Map<string, BasePlayer> = new Map();

    static getPlayer(name: string): BasePlayer | undefined {
        let player = PlayerManager.players.get(name);

        if (!player) {

            switch (name) {
                case 'youtube':
                    player = new YoutubePlayer(QueueManager.getQueue('youtube'));
                    PlayerManager.players.set(name, player);
            }
        }

        return player;
    }

}
