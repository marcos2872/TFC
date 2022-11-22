const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_team: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      home_team_goals: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      away_team: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      away_team_goals: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      in_progress: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('matches');
  },
};
