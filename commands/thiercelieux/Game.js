const Command = require('../command');
const axios = require('axios');
const Service = require('../../services');


module.exports = class NewGame extends Command {

    static match(message) {
       return message.content.startsWith('!loupgarou');
    }

    static action(message) {
        var players = [];
        message.content.split(' ').forEach(player => {
            players.push(player.replace('<@', '').replace('>', '').replace('!', ''));
        });
        
        axios.post('http://127.0.0.1:8080/api/new-game')
        .then( function (response) {
            message.mentions.users.forEach(user => {
                var pId = parseInt(user.id.substr(-4));
                axios.post('http://127.0.0.1:8080/api/game-add-player/' + response.data.id, ({
                    playerId: pId
                }))
                .then((response) => {
                if(players.indexOf(user.id) > 0) {
                    user.createDM()
                    .then((DMChanel) => {
                        DMChanel.send(`Hello, je suis le narrateur de cette partie. Reste attentif au rôle qui va-t-être attribué, ${user.username}`);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                }
                console.log(response);
                })
                .catch( error => console.log(error));
            });
        })
    }
}