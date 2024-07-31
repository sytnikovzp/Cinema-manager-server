'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
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
      code: {
        type: Sequelize.STRING(3),
        unique: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('countries');
  },
};
