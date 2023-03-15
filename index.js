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
    channels: [
        `${process.env.TWITCH_CHANNEL}`,
        `${process.env.TWITCH_CHANNEL2}`,
        `${process.env.TWITCH_CHANNEL3}`
    ]
});

client.connect().catch(console.error);

// Normal and Command responses
client.on('message', (channel, tags, message, self) => {
    if (self) return;

    var chatmsg = message.toLocaleLowerCase();

    switch (true) {
        case chatmsg.includes('@mikasabxt'):
            client.say(channel, `Hola, @${tags.username}. Soy Mikasa, bot de Lxght. Mucho gusto :)`)
        break;
        case chatmsg.includes('mikasabxt'):
            client.say(channel, `Hola, @${tags.username}. Soy Mikasa, bot de Lxght. Mucho gusto :)`)
        break;
    }   
});

// Twitch Events responses
// Suscriptions
client.on('subscription', (channel, username, method, message, userstate) => {
    client.say(channel, `Muchas gracias por esa suscripción ` + username + `.`)
});

// Resub
client.on('resub', (channel, username, months, message, userstate, methods) => {
    client.say(channel, username + `, muchas gracias por esa suscripción de ` + userstate.cumulativeMonths + ` meses.`);

    let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
});

// Gifted Subs
client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
    switch (true) {
        case senderCount <= 5:
            client.say(channel, `Muchas gracias por la sub! Disfruta los beneficios!`)
        break;
        case senderCount <= 50:
            client.say(channel, `En verdad gracias por regalar esas ` + userstate.months + ` subs a esta comunidad. Si recibiste una no olvides agradecer.`)
        break;
        case senderCount <= 100:
            client.say(channel, `Mil gracias por esas ` + userstate.months + ` subs!! ☆ En serio gracias por apoyar el stream, recuerda agradecer si obtuviste una.`)
        break;
    }

    let senderCount = ~~userstate["msg-param-sender-count"];
});

// Cheers
client.on("cheer", (channel, userstate, message) => {
    if (userstate.bits == 1) {
        client.say(channel, `Gracias por el  bit, ` + userstate.username);
    } else if (userstate.bits >= 2) {
        client.say(channel, `Gracias por los ` + userstate.bits + ` bits, `+ userstate.username);
    }
});

// Raid
client.on("raided", (channel, username, viewers) => {
    if (viewers == 1) {
        client.say(channel, `Muchas gracias por el raid, ` + username + `!`);
    } else if (viewers >= 2) {
        client.say(channel, username + `, muchas gracias por el raid de ` + viewers + ` personas!`);
    }
});