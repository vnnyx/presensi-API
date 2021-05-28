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
        allowNull: false,
        unique: {
          name: 'username',
          msg: 'id telah dipakai',
        },
        validate: {
          notNull: {
            msg: 'Please enter your discord ID',
          },
          len: {
            msg: 'Masukkan ID yang benar',
            args: [3, 12],
          },
        },
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
  
  
  