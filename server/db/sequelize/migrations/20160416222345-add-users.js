module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING
        },
        resetPasswordToken: {
          type: DataTypes.STRING
        },
        resetPasswordExpires: {
          type: DataTypes.DATE
        }
      }
    ).then(() =>
      queryInterface.addIndex(
        'Users',
        [DataTypes.fn('lower', DataTypes.col('email'))],
        {
          indexName: 'users_email',
          indicesType: 'unique'
        }
      )
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
