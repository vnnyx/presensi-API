module.exports = (sequelize, DataTypes) => {
    const presensi = sequelize.define('presensi', {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your full name',
          },
          len: {
            msg: 'Require full name length 3 - 32',
            args: [3, 32],
          },
        },
      },
      discordId: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your status',
          },
        },
      },
    })
    presensi.associate = function(models) {
      presensi.belongsTo(models.studyGroup, {foreignKey: 'studyGroupId', as: 'studyGroup'})
    };
    return presensi
}
  
  
  