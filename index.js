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
        case 'commands':
            client.say(channel, `@${tags.username}, avaible commands are: Commands Help Greetings Hi !website !name For more help just type "Help"`);
            break;
        case 'greetings':
            client.say(channel, `Hello @${tags.username}, welcome to the channel`);
            break;
        case 'hi':
            client.say(channel, `Hi @${tags.username}`);

        default:
            let mymessage = message.toString();

            if ((mymessage.split(' ')[0]).toLowerCase() === '!upvote' || 'upvote') {
                client.say(channel, `TwitchLit @${(mymessage.split(' ')[1] + '_' + mymessage.split(' ')[2])} TwitchLit you have been UPVOTED by ${ tags.username }`);
            } else if ((mymessage.split(' ')[0]).toLowerCase() === '!cheer' || 'cheers') {
                console.log(`HSCheers @${(mymessage.split(' ')[1] + '_' + mymessage.split(' ')[2])} HSCheers you have been UPVOTED by ${ tags.username }`);
            }
        break;
    }
});
