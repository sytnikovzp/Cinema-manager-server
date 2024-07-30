'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('directors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      country_id: {
        type: Sequelize.INTEGER,
      },
      birth_date: {
        type: Sequelize.DATE,
      },
      death_date: {
        type: Sequelize.DATE,
      },
      photo: {
        type: Sequelize.TEXT,
      },
      biography: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('directors');
  },
};
