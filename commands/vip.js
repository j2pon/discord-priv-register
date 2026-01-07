const { j2ponstaff, vip, emojitik } = require('../config.json');

module.exports = {
    name: 'vip',
    async execute(message, args) {
        if (!message.member.roles.cache.has(j2ponstaff) && !message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('Bu komutu kullanmak için gerekli yetkin yok.');
        }

        const j2pon = args[0]?.replace(/[<@!>]/g, '');
        if (!j2pon) {
            return message.channel.send('Lütfen Vip vermek istediğiniz kişiyi etiketleyin ya da kullanıcı id\'sini giriniz.');
        }

        const member = await message.guild.members.fetch(j2pon).catch(() => null);
        if (!member) {
            return message.channel.send('Belirtilen kullanıcı bulunamadı.');
        }

        const j2ponvip = message.guild.roles.cache.get(vip);
        if (!j2ponvip) {
            return message.channel.send('Rol bulunamadı.');
        }

        try {
            await member.roles.add([j2ponvip]);
            await message.react(emojitik);
        } catch (error) {
            console.error('Rol eklenirken bir hata oluştu:', error);
            message.channel.send('Bir hata oluştu. Roller eklenemedi.');
        }
    },
};

