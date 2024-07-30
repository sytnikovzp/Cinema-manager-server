'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      genre_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genres',
          key: 'id',
        },
      },
      release_year: {
        type: Sequelize.INTEGER,
      },
      poster: {
        type: Sequelize.TEXT,
      },
      trailer: {
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  },
};
