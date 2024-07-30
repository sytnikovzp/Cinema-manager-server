'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Director.belongsTo(models.Country, { foreignKey: 'countryId' });
      Director.belongsToMany(models.Movie, { through: models.MovieDirector });
    }
  }
  Director.init(
    {
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      country_id: DataTypes.INTEGER,
      birth_date: DataTypes.DATE,
      death_date: DataTypes.DATE,
      photo: DataTypes.TEXT,
      biography: DataTypes.TEXT,
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
      modelName: 'Director',
      tableName: 'directors',
      underscored: true,
    }
  );
  return Director;
};
