const { j2ponstaff, kayitli, kayitsiz, emojitik } = require('../config.json');

module.exports = {
    name: 'kayit',
    async execute(message, args) {
        if (!message.member.roles.cache.has(rexstaff) && !message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('Bu komutu kullanmak için gerekli yetkin yok.');
        }

        const j2pon = args[0]?.replace(/[<@!>]/g, '');
        if (!rex) {
            return message.channel.send('Lütfen kaydetmek istediğiniz kişiyi etiketleyin ya da kullanıcı id\'sini giriniz.');
        }

        const member = await message.guild.members.fetch(j2pon).catch(() => null);
        if (!member) {
            return message.channel.send('Belirtilen kullanıcı bulunamadı.');
        }

        const j2ponkayitli = message.guild.roles.cache.get(kayitli);
        const j2ponkayitsiz = message.guild.roles.cache.get(kayitsiz);

        if (!j2ponkayitli || !j2ponkayitsiz) {
            return message.channel.send('Rol(ler) bulunamadı.');
        }

        try {
            await member.roles.add([j2ponkayitli]);
            await member.roles.remove([j2ponkayitsiz]);
            await message.react(emojitik);
        } catch (error) {
            console.error('Rol eklenirken bir hata oluştu:', error);
            message.channel.send('Bir hata oluştu. Roller eklenemedi.');
        }
    },
};

