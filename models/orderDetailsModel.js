const { DataTypes } = require("sequelize");
function model(sequelize) {
  return sequelize.define(
    "Order_Details",
    {
      custId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: { type: DataTypes.STRING, allowNull: false },
      orderId: { type: DataTypes.STRING, allowNull: false },
      orderDetailId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      orderPrice: { type: DataTypes.DOUBLE, allowNull: false },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["orderDetailId"],
        },
      ],
    }
  );
}

module.exports = model;
