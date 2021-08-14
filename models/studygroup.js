"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class studyGroup extends Model {
    static associate(models) {}
  }
  studyGroup.init(
    {
      judul: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      penutor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discordId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: "studyGroup",
    }
  );
  return studyGroup;
};
