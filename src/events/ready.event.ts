import { Client } from "discord.js";
import { BaseEvent } from "./base.event";

export class ReadyEvent implements BaseEvent {

    constructor() {
        this.name = 'ready';
        this.once = true;
    }

    name: string;
    once: boolean;

    execute (client: Client): void {
        console.log(`Logged in as ${client?.user?.tag}!`);
    }

}