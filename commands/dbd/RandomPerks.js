const Command = require('../command');
const Discord = require('discord.js');
const axios = require('axios');

module.exports = class RandomPerks extends Command {

    static match(message) {
        return message.content.startsWith('!random');
    }

    static action(message) {
        var splittedMessage = message.content.split(' ')[1];
        axios
            .get('https://bridge.buddyweb.fr/api/deadbydaylight/perks' + splittedMessage)
            .then(function(response) {
                let perkArr = [];
                for(let i = 0; i < 4; i++) {
                    perkArr.push(response.data[Math.random() * response.data.length | 0]);
                }

                const embed = new Discord.RichEmbed();

                embed
                .setTitle((splittedMessage == 'survivor') ? '**SURVIVANT**' : '**TUEUR**')
                .setAuthor(message.member.displayName, message.member.user.avatarURL)
                .setColor((splittedMessage == 'survivor') ? 0x0c60fc : 0xde2937)
                .setThumbnail((splittedMessage == 'survivor') ? 
                    'https://66.media.tumblr.com/1ba3391fc0921c7ab004d1ff6b3a0904/tumblr_p30uex82gR1w1zx8lo1_1280.png' : 
                    'https://img00.deviantart.net/b0f0/i/2017/344/3/1/myers_the_shape__dbd__by_rucchii-dbwaulq.png');
                for(let i = 0; i < 4; i++) {
                    embed.addField(`Perk n° ${i+1}`, perkArr[i].perk_name,  true)
                }
                message.channel.send(embed);
        });
    } 
}