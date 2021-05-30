const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)
    const exampleEmbed = new Discord.MessageEmbed()
	    .setColor('#ffa90a')
	    .setTitle('Bug Oak')
	    .setAuthor('Study Group')
	    .setDescription('Tutorial Anti Banned')
	    .setThumbnail('https://media.discordapp.net/attachments/847092542570889236/847475968431751168/RPLGDC.png?width=701&height=701')
	    .addFields(
            { name: 'Penutor', value: 'Michael Putera Wardana'},
		    { name: 'Hari/Tanggal', value: 'Kamis, 31 Desember 2021' },
		    { name: 'Jam', value: '10:12'},
		    { name: 'Tempat', value: 'Matrix'},
	    )
	    .setFooter('Jangan Lupa Hadir', 'https://media.discordapp.net/attachments/847092542570889236/847475968431751168/RPLGDC.png?width=701&height=701');

    //client.channels.cache.get('847092549230788619').send(exampleEmbed)
})

client.on('message', gotreaction);

function gotreaction(re){
	if (re.content == '!absen'){
		re.delete()
		const exampleEmbed = new Discord.MessageEmbed()
	    .setColor('#ffa90a')
	    .setTitle('Bug Oak')
	    .setAuthor('Study Group')
	    .setDescription('Tutorial Anti Banned')
	    .setThumbnail('https://media.discordapp.net/attachments/847092542570889236/847475968431751168/RPLGDC.png?width=701&height=701')
	    .addFields(
            { name: 'Penutor', value: 'Michael Putera Wardana'},
		    { name: 'Hari/Tanggal', value: 'Kamis, 31 Desember 2021' },
		    { name: 'Jam', value: '10:12'},
		    { name: 'Tempat', value: 'Matrix'},
	    )
	    .setFooter('Jangan Lupa Hadir', 'https://media.discordapp.net/attachments/847092542570889236/847475968431751168/RPLGDC.png?width=701&height=701');
		re.channel.send(exampleEmbed).then(async (question) => {
			await question.react('✅')
			await question.react('❌')
		})
	}
}

client.login(process.env.DISCORD_TOKEN);
