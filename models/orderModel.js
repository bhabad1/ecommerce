const { DataTypes } = require("sequelize");
function model(sequelize) {
  return sequelize.define(
    "Orders",
    {
      custId: { type: DataTypes.STRING, allowNull: false },
      orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      productId: { type: DataTypes.STRING, allowNull: false },
      amount: { type: DataTypes.DOUBLE, allowNull: false },
      orderDate: { type: DataTypes.DATE, allowNull: false },
    },
    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ["orderId"],
        },
      ],
      createdAt: false,
    }
  );
}

module.exports = model;
