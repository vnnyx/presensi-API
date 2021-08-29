"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class presensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      presensi.belongsTo(models.studyGroup, {
        foreignKey: "studyGroupId",
        onDelete: "CASCADE",
      });
    }
  }
  presensi.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discordId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "presensi",
    }
  );
  return presensi;
};
