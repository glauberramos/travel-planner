'use strict';

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Travels', {
        id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
           model: 'Users',
           key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        destination: {
          type: DataTypes.STRING
        },
        startDate: {
          type: DataTypes.DATE
        },
        endDate: {
          type: DataTypes.DATE
        },
        comments: {
          type: DataTypes.STRING
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('Travels');
  }
};
