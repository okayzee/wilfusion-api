'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    emailVerified: {
      allowNull: true,
      type: DataTypes.DATE
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userType: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    resetToken: {
      allowNull: true,
      type: DataTypes.STRING
    }
  });

  Users.associate = function(models) {
    // associations can be defined here
  //   Users.hasOne(models.Status, {
  //     foreignKey: {
  //       name: 'userStatusId'
  //     }
  //   });
  //   models.Status.belongsTo(Users);
  };
  return Users;
};