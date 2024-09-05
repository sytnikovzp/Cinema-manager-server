const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieStudio extends Model {
    static associate(models) {
      MovieStudio.belongsTo(models.Movie, {
        foreignKey: 'movieId',
      });

      MovieStudio.belongsTo(models.Studio, {
        foreignKey: 'studioId',
      });
    }
  }
  MovieStudio.init(
    {
      movie_id: DataTypes.INTEGER,
      studio_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MovieStudio',
      tableName: 'movies_studios',
      timestamps: false,
      underscored: true,
    }
  );
  return MovieStudio;
};
