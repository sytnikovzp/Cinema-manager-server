'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      genre_id: DataTypes.INTEGER,
      release_year: DataTypes.INTEGER,
      poster: DataTypes.TEXT,
      trailer: DataTypes.TEXT,
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
      modelName: 'Movie',
      tableName: 'movies',
      underscored: true,
    }
  );
  return Movie;
};
