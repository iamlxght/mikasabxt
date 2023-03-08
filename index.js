require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },

    connection: {
        reconnect: true,
        secure: true
    },

    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `oauth:${process.env.TWITCH_OAUTH}`
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    switch (message.toLocaleLowerCase()) {
        case 'hola':
            client.say(channel, `¡Hola, @${tags.username}!`);
        break;

        case '!ban':
            client.say(channel, `¿${tags.username}? ¡Banéenme a ese wey!`);
        break;
    }
});
