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
    channels: [`${process.env.TWITCH_CHANNEL}`,`${process.env.TWITCH_CHANNEL2}`,`${process.env.TWITCH_CHANNEL3}`]
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    switch (message.toLocaleLowerCase()) {
        case 'laito':
            client.say(channel, `El Laito`);
        break;
        case 'mikasa':
            client.say(channel, `Hola, HyliaHale soy bot de Lxght. Y me dijo que tu eres una shingona, ya habrá más oportunidades.`)
        break;
    }   
});
