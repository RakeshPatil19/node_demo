'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_post', {
      blog_post_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      blog_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blog_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blog_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blog_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    
  },
};
