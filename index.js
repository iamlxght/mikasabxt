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

// Normal and Command responses
client.on('message', (channel, tags, message, self) => {
    if (self) return;

    switch (message.toLocaleLowerCase()) {
        case '@mikasabxt':
            client.say(channel, `Hola, @${tags.username}. Soy Mikasa, bot de Lxght. Mucho gusto :)`)
        break;

        case 'hola @mikasabxt':
            client.say(channel, `Hola, @${tags.username}. Soy Mikasa, bot de Lxght. Mucho gusto :)`)
        break;
    }   
});

// Twitch Events responses
// Suscriptions
client.on('subscription', (channel, username, method, message, userstate) => {
    client.say(channel, `Gracias por esa suscripción ` + username + `.`);
});

// Resub
client.on('resub', (channel, username, months, message, userstate, methods) => {
    client.say(channel, username + `, muchas gracias por esa suscripción de ` + months + ` meses.`);

    let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
});

// Gifted Subs
client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
    client.say(channel, `Muchas gracias por regalar esas ` + senderCount + ` subs.`);
    
    let senderCount = ~~userstate["msg-param-sender-count"];
});

// Cheers
client.on("cheer", (channel, userstate, message) => {
    if (userstate.bits == 1) {
        client.say(channel, `Gracias por el ` + userstate.bits + ` bit, @${userstate.username}`);
    } else if (userstate.bits >= 2) {
        client.say(channel, `Gracias por los ` + userstate.bits + ` bits, @${userstate.username}`);
    }
});