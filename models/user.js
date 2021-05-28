module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      fullName: {
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'username',
          msg: 'username already taken',
        },
        validate: {
          notNull: {
            msg: 'Please enter your username',
          },
          len: {
            msg: 'Require username length 3 - 12',
            args: [3, 12],
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your password',
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false,
      },
    })
    return User
  }
  
  
  