const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: false });
const db = require("../models");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let boton = false;
client.on("message", gotreaction);
async function gotreaction(re) {
  if (re.content == "!absen") {
    re.delete();
    if (!boton) {
      boton = true;
      const name = re.guild.member(re.author.id).displayName;
      let sg = await db.studyGroup.findOne({
        where: { penutor: name, selesai: false, info: true },
      });
      if (sg) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#ffa90a")
          .setTitle(sg.judul)
          .setAuthor("Study Group")
          .setDescription(sg.deskripsi)
          .setThumbnail(
            "https://media.discordapp.net/attachments/847092542570889236/847475968431751168/RPLGDC.png?width=701&height=701"
          )
          .addFields(
            { name: "Penutor", value: sg.penutor },
            { name: "Hari/Tanggal", value: sg.tanggal.toDateString() },
            {
              name: "Pukul",
              value: sg.tanggal.getHours() + ":" + sg.tanggal.getMinutes(),
            },
            { name: "Tempat", value: sg.tempat }
          )
          .setFooter(
            "RPLGDC Lab",
            "https://media.discordapp.net/attachments/847092542570889236/847475968431751168/RPLGDC.png?width=701&height=701"
          );
        re.channel.send(exampleEmbed).then(async (question) => {
          await question.react("✅");
          await question.react("❌");

          const filter = (reaction, user) =>
            reaction.emoji.name === "✅" || reaction.emoji.name === "❌";
          const collector = question.createReactionCollector(filter, {
            time: 1000 * parseInt(process.env.ABSEN_INTERVAL),
          });
          collector.on("end", (collected) => {
            dhadir = [];
            collected.forEach((r) => {
              r.users.cache.forEach((u) => {
                if (u.id != process.env.BOT_ID) {
                  if (r.emoji.name === "✅") {
                    const nhadir = {
                      discordId: u.id,
                      nama: question.guild.member(u.id).displayName,
                      status: "hadir",
                      studyGroupId: sg.id,
                    };
                    dhadir.push(nhadir);
                  } else {
                    const nhadir2 = {
                      discordId: u.id,
                      nama: question.guild.member(u.id).displayName,
                      status: "tidak hadir",
                      studyGroupId: sg.id,
                    };
                    dhadir.push(nhadir2);
                  }
                }
              });
            });
            db.presensi
              .bulkCreate(dhadir)
              .then(() => {
                console.log("Sukses");
              })
              .catch((error) => {
                console.log(error);
              });
          });

          sg.selesai = true;
          await sg.save();
          boton = false;
        });
      } else {
        const channel = client.channels.cache.get(process.env.CHANNEL_ID);
        channel.send("Anda Belum Terdaftar Sebagai Penutor");
      }
    } else {
      const channel = client.channels.cache.get(process.env.CHANNEL_ID);
      channel.send("Masih Ada Sesi Aktif");
    }
  }
}

const infoSg = async () => {
  let cek = await db.studyGroup.findOne({ where: { info: false } });
  if (cek) {
    let tanggal = new Date(cek.tanggal);
    let dnow = new Date(Date.now());
    let t = tanggal.getDate();
    let tnow = dnow.getDate();
    if (t === tnow + 1) {
      const channel = client.channels.cache.get(process.env.CHANNEL_INFO_ID);
      const embed = new Discord.MessageEmbed()
        .setColor("#ffa90a")
        .setTitle(cek.judul)
        .setAuthor("Study Group")
        .setDescription(cek.deskripsi)
        .setThumbnail(
          "https://media.discordapp.net/attachments/847092542570889236/847475968431751168/RPLGDC.png?width=701&height=701"
        )
        .addFields(
          { name: "Penutor", value: cek.penutor },
          { name: "Hari/Tanggal", value: cek.tanggal.toDateString() },
          {
            name: "Pukul",
            value: cek.tanggal.getHours() + ":" + cek.tanggal.getMinutes(),
          },
          { name: "Tempat", value: cek.tempat }
        )
        .setFooter(
          "RPLGDC Lab",
          "https://media.discordapp.net/attachments/847092542570889236/847475968431751168/RPLGDC.png?width=701&height=701"
        );
      channel.send("Jangan Lupa Hadir Besok @everyone", embed);
      cek.info = true;
      await cek.save();
    }
  }
};
setInterval(infoSg, 60000 * parseInt(process.env.INTERVAL));

client.login(process.env.DISCORD_TOKEN);
