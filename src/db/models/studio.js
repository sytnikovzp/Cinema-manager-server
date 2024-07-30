'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Studio.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      location_id: DataTypes.INTEGER,
      foundation_year: DataTypes.INTEGER,
      logo: DataTypes.TEXT,
      about: DataTypes.TEXT,
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Studio',
      tableName: 'studios',
      underscored: true,
    }
  );
  return Studio;
};
