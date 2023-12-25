const { DataTypes } = require("sequelize");
function model(sequelize) {
  return sequelize.define(
    "Customers",
    {
      custId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING, allowNull: false },
      pincode: { type: DataTypes.STRING, allowNull: false },
      // created: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW,
      // },
      // updated: { type: DataTypes.DATE },
    },

    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ["custId"],
        },
      ],
      // createdAt: false,
      // updatedAt: false,
    }
  );
}

module.exports = model;
