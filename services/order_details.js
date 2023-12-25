const db = require("../helpers/db");
const { Sequelize, Op } = require("sequelize");

async function create(params) {
  const order = new db.Order_Details(params);
  await order.save();
}

async function update(orderId, productId, params) {
  const order = await getByOrderProductId(orderId, productId);
  Object.assign(order, params);
  await order.save();
}

async function getByOrderProductId(orderId, productId) {
  const order = await db.Order_Details.findAll({
    where: {
      orderId,
      productId,
    },
  });
  if (!order) throw "order not found";
  return order;
}
async function getById(orderId) {
  const order = await db.Order_Details.findByPk(orderId);
  if (!order) throw "order not found";
  return order;
}

async function remove(orderId) {
  const order = await db.Order.destroy({
    where: {
      orderId,
    },
  });
  const orderDetails = await db.Order_Details.destroy({
    where: {
      orderId,
    },
  });
  return order;
}
async function getByOrderId(custId) {
  const order = await db.Order_Details.findAll({
    where: {
      custId,
    },
  });
  if (!order) throw "order not found";
  return order;
}

module.exports = {
  getById,
  create,
  update,
  remove,
  getByOrderId,
};
