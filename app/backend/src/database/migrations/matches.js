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
      homeTeam: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      homeTeamGoals: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      awayTeam: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      awayTeamGoals: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      inProgress: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('matches');
  },
};
