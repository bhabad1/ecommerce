const db = require("../helpers/db");
const { Sequelize, Op } = require("sequelize");

async function getAll() {
  const products = await db.Products.findAll();
  return products;
}

async function create(params) {
  const product = new db.Products(params);
  await product.save();
}

async function update(productId, params) {
  const product = await getById(productId);
  Object.assign(product, params);
  await product.save();
}

async function getById(productId) {
  const product = await db.Products.findByPk(productId);
  if (!product) throw "product not found";
  return product;
}

async function remove(productId) {
  const product = await db.Products.destroy({
    where: {
      productId,
    },
  });
  return product;
}
async function getByOrderId(orderId) {
  const product = await db.Products.findOne({
    where: {
      orderId,
    },
  });
  if (!product) throw "product not found";
  return product.toJSON();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByOrderId,
};
