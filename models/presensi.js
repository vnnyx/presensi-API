module.exports = (sequelize, DataTypes) => {
  const presensi = sequelize.define("presensi", {
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
  });
  presensi.associate = function (models) {
    presensi.belongsTo(models.studyGroup, {
      foreignKey: "studyGroupId",
      as: "studyGroup",
    });
  };
  return presensi;
};
