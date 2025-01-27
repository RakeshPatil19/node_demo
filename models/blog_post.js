'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlogPost.init(
    {
     blog_post_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      blog_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blog_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blog_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blog_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
  }, {
    sequelize,
    timeStamps: true,
    modelName: 'BlogPost',
    tableName: 'blog_post',
  });
  return BlogPost;
};