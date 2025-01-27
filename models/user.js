'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_email  : {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      user_password  : {
        allowNull: false,
        type: DataTypes.STRING,
      },
     
  }, {
    sequelize,
    timeStamps: true,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};