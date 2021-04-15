import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super('ping', {
            aliases: ['ping'] 
        });
    }

    public exec(message: Message) {
        return message.channel.send(`🏓 \`${message.client.ws.ping}ms\``)
    }
}