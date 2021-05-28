module.exports = (sequelize, DataTypes) => {
  const studyGroup = sequelize.define("studyGroup", {
    judul: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Masukkan judul",
        },
      },
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Masukkan tanggal study group",
        },
      },
    },
    penutor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Masukkan nama penutor",
        },
      },
    },
    tempat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Masukkan channel",
        },
      },
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Masukkan deskripsi study group",
        },
      },
    },
    info: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    selesai: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return studyGroup;
};
