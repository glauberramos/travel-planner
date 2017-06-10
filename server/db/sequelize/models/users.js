import Promise from 'bluebird';
import bcryptNode from 'bcrypt-nodejs';

const bcrypt = Promise.promisifyAll(bcryptNode);

/* eslint-disable no-param-reassign */
function hashPassword(user) {
  if (!user.changed('password')) return null;
  return bcrypt.genSaltAsync(5).then(salt =>
    bcrypt.hashAsync(user.password, salt, null).then((hash) => {
      user.password = hash;
    })
  );
}
/* eslint-enable no-param-reassign */

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,

    classMethods: {
      associate(models) {
        User.hasMany(models.Token, {
          foreignKey: 'userId'
        });

        User.hasMany(models.Travel, {
          foreignKey: 'userId'
        });
      }
    },

    instanceMethods: {
      comparePassword(candidatePassword) {
        return bcrypt.compareAsync(candidatePassword, this.password);
      },

      toJSON() {
        return {
          id: this.id,
          email: this.email,
          role: this.role
        };
      }
    }
  });

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
