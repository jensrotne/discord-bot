import { Message } from "discord.js";
import { BaseCommand } from "./base.command";

export class PingCommand implements BaseCommand {

    name: string = "ping";
    handler(message: Message<boolean>): Promise<void> {
        message.channel.send("pong");

        return Promise.resolve();
    }

}