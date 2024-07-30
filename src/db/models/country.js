'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Actor, {
        foreignKey: 'countryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Country.hasMany(models.Director, {
        foreignKey: 'countryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Country.hasMany(models.Location, {
        foreignKey: 'countryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Country.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Country',
      tableName: 'countries',
      timestamps: false,
      underscored: true,
    }
  );
  return Country;
};
