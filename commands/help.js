const { EmbedBuilder } = require('discord.js');
const {j2ponhelpgif, j2ponfooter, prefix} = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Botun tüm komutlarini ve açiklamalarini listeler.',

    async execute(message) {
        
        const helpEmbed = new EmbedBuilder()
            .setColor('#0099ff') 
            .setTitle('Komut Yardim Menüsü')
            .setThumbnail(j2ponhelpgif)
            .setImage(j2ponhelpgif)
            .setDescription('Botun kullanilabilir tüm komutlarinin listesi:')
            .addFields(
                
                { name: `${prefix}kayit <@Kullanici/ID>`, value: 'Belirttiğiniz Kullaniciyi Sunucuya Kayit eder' },
                { name: `${prefix}ucube <@Kullanici/ID>`, value: 'Belirttiğiniz Kullaniciyi Ucube Ilan Eder.' },
                { name: `${prefix}vip`, value: 'Belirtilen Kişiye Vip Rolü Verir.' },  
                { name: `${prefix}otover`, value: 'Rolü Bulunmayan Kişilere Kayıtsız Rolü Verir.' },  
                { name: `${prefix}rolal <@Kullanici/ID>`, value: 'Belirttiğiniz kullaniciya roller verir.' },  
                { name: `${prefix}rolver <@Kullanici/ID>`, value: 'Belirttiğiniz kullanicidan roller alir.' }  
            )
            .setFooter({ text: j2ponfooter });

        
        await message.reply({ embeds: [helpEmbed] });
    }
};



