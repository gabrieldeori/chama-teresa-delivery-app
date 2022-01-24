module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    seller_id: { type: DataTypes.INTEGER, foreignKey: true },
    total_price: DataTypes.DECIMAL(10, 2),
    delivery_address: DataTypes.STRING(),
    delivery_number: DataTypes.STRING(),
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING(),
  },
  {
    tableName: 'sales',
    underscored: true,
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'seller_id', as: 'user' },
      { foreignKey: 'user_id', as: 'user' },
    );
  };

  return Sale;
};
