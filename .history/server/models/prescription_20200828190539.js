'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define('Prescription', {
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING
  },
  formula: {
    allowNull: false,
    type: DataTypes.STRING
  },
  duration: {
    allowNull: false,
    type: DataTypes.STRING
  }
});
  Prescription.associate = function(models) {
    // associations can be defined here
  };
  return Prescription;
};