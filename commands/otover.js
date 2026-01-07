const { kayitsiz, j2ponstaff } = require('../config.json');

module.exports = {
    name: 'otover',
    async execute(message, args) {
        if (message.author.id !== j2ponstaff && !message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('Bu komutu kullanma yetkiniz yok.');
        }

        const unregrole = message.guild.roles.cache.get(kayitsiz);
        if (!unregrole) {
            return message.channel.send('Belirtilen rol bulunamadı.');
        }

        message.guild.members.fetch().then(members => {
            members.forEach(member => {
                if (member.roles.cache.size === 1) {
                    member.roles.add(unregrole).catch(err => {
                        console.error(`Rol verilemedi: ${member.user.tag}`, err);
                    });
                }
            });
        });

        message.channel.send(`Herkese başarıyla <@&${unregrole.id}> rolü verildi!`);
    },
};

