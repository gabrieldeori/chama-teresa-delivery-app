module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SalesProducts', {
      quantity: DataTypes.INTEGER,
  },
  { tableName: 'salesProducts', timestamps: false });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return SaleProduct;
};
