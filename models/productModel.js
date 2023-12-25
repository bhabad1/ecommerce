const { DataTypes } = require("sequelize");
function model(sequelize) {
  return sequelize.define(
    "Products",
    {
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      description: { type: DataTypes.STRING },
      stock: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ["productId"],
        },
      ],
    }
  );
}

module.exports = model;
