export default (sequelize, DataTypes) => {
  const Travel = sequelize.define('Travel', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
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
  }, {
    timestamps: false,

    classMethods: {
      associate(models) {
        Travel.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });

  return Travel;
};
