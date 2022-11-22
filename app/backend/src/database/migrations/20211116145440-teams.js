const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_name: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('teams');
  },
};