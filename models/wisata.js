'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wisata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  }
  wisata.init({
    nama: DataTypes.STRING,
    desc: DataTypes.TEXT,
    lokasi: DataTypes.STRING,
    photo: DataTypes.STRING,
    streetview: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'wisata',
  });
  return wisata;
};