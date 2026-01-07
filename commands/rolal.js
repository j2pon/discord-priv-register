const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionsBitField } = require('discord.js');
const { j2ponstaff } = require('../config.json');

module.exports = {
    name: 'rolal',
    description: 'Belirttiğin kullanıcıdan roller alır.',
    
    async execute(message, args) {
        try {
            
            const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);

           
            if (!target) return message.reply("Lütfen geçerli bir kullanıcı ID'si veya @etiket belirtin.");

           
            const hasAdminPermission = message.member.permissions.has(PermissionsBitField.Flags.Administrator);
            const hasJ2ponStaffRole = message.member.roles.cache.has(j2ponstaff);

            
            if (!hasAdminPermission && !hasJ2ponStaffRole) {
                return message.reply("Bu komutu kullanmak için yönetici veya 'j2ponstaff' rolüne sahip olmalısınız.");
            }

           
            const roles = target.roles.cache
                .filter(role => role.name !== '@everyone')
                .map(role => ({
                    label: role.name,
                    value: role.id
                }));

           
            if (roles.length === 0) {
                return message.reply("Bu kullanıcının üzerinde alınacak başka rol bulunmuyor.");
            }

            
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('select_roles_remove')
                .setPlaceholder('Almak istediğiniz rolleri seçin')
                .setMinValues(1)
                .setMaxValues(roles.length)
                .addOptions(
                    roles.map(role => new StringSelectMenuOptionBuilder().setLabel(role.label).setValue(role.value))
                );

            const row = new ActionRowBuilder().addComponents(selectMenu);

            
            const messageMenu = await message.reply({
                content: `Lütfen ${target.user.tag} için alınacak rolleri seçin:`,
                components: [row]
            });

            
            const filter = i => i.customId === 'select_roles_remove' && i.user.id === message.author.id;
            const collector = messageMenu.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async interaction => {
                await interaction.deferUpdate(); 

                const selectedRoles = interaction.values;
                const rolePromises = selectedRoles.map(roleId => target.roles.remove(roleId));
                
                try {
                    await Promise.all(rolePromises);
                    await message.reply(`Başarıyla ${target.user.tag} kullanıcısından seçilen roller alındı.`);
                } catch (error) {
                    console.error(error);
                    await message.reply('Roller alınırken bir hata oluştu.');
                }
            });

            
            collector.on('end', collected => {
                if (collected.size === 0) {
                    messageMenu.edit({ content: 'Süre doldu, roller alınmadı.', components: [] });
                }
            });

        } catch (error) {
            
           
            return message.reply("Komut çalıştırılırken bir hata oluştu. Lütfen geçerli bir kişi belirtin.");
        }
    }
};

