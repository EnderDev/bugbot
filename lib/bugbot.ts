import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, SQLiteProvider } from "discord-akairo";
import { open } from "sqlite";
import { Database } from "sqlite3";
import { config, akairoConfig, discordConfig } from "../config";

class BugBot extends AkairoClient {
    public commandHandler: CommandHandler;
    public inhibitorHandler: InhibitorHandler;
    public listenerHandler: ListenerHandler;

    public settings: SQLiteProvider;

    constructor() {
        super({ ...akairoConfig, ...config });

        this.commandHandler = new CommandHandler(this, {
            directory: "./src/commands",
            prefix: discordConfig.prefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './src/inhibilitors'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/events'
        });

        this.settings = new SQLiteProvider(open({
            filename: "db.sqlite",
            driver: Database
        }), 'data', {
            idColumn: 'id',
            dataColumn: 'data'
        });

        // this.initDB();

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();

        process.on("uncaughtException", (e) => {
            console.log(e)
        })
    }

    public async initDB() {
        await this.settings.init()
    }
}

export default BugBot;