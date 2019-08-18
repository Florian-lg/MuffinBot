const UpdateRoles = require('./updateRoles');
const FunCommands = require('./funCommands');
const RandomPerks = require('./dbd/RandomPerks');
const Game = require('./thiercelieux/Game');
const RegisterPlayer = require('./thiercelieux/RegisterPlayer');

module.exports = class CommandSeparator {

    static identifyMessage(message) {

        let messageReceived = message.content.split(' ')[0];
        console.log(messageReceived);
        switch (messageReceived) {
            case '!join':
                console.log(`funCommand used by ${message.member.displayName}`);
                FunCommands.parse(message);             
                break;
            case '!update':
                console.log(`UpdateRoles used by ${message.member.displayName}`);
                UpdateRoles.parse(message);              
                break;
            case '!random':
                console.log(`RandomPerks used by ${message.member.displayName}`);
                RandomPerks.parse(message);
                break;
            case '!loupgarou':
                console.log(`Game used by ${message.member.displayName}`);
                Game.parse(message);
                break;
            case '!register':
                console.log(`Register used by ${message.member.displayName}`);
                RegisterPlayer.parse(message);
                break;
        }
    }
}