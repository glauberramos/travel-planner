module.exports = {
  up(queryInterface, DataTypes) {
    queryInterface.addColumn('Users', 'role', DataTypes.STRING);
  },

  down(queryInterface) {
    queryInterface.removeColumn('Users', 'role');
  }
};
