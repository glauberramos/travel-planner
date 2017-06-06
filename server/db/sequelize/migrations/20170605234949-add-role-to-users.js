'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    queryInterface.addColumn('Users', 'role', DataTypes.STRING);
  },

  down: function (queryInterface, DataTypes) {
    queryInterface.removeColumn('Users', 'role');
  }
};
