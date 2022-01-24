module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      urlImage: {
        field: 'url_image',
        allowNull: false,
        type: Sequelize.STRING(),
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
