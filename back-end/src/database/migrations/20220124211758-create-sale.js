module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'seller_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      totalPrice: {
        field: 'total_price',
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      deliveryAddress: {
        field: 'delivery_address',
        allowNull: false,
        type: Sequelize.STRING(),
      },
      deliveryNumber: {
        field: 'delivery_number',
        allowNull: false,
        type: Sequelize.STRING(),
      },
      saleDate: {
        field: 'sale_date',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(),
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};
