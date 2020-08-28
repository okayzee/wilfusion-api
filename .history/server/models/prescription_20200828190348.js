'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define('Prescription', {
    name: DataTypes.STRING
  }, {});
  Prescription.associate = function(models) {
    // associations can be defined here
  };
  return Prescription;
};