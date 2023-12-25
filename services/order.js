const db = require("../helpers/db");
const { Sequelize, Op } = require("sequelize");

async function create(params) {
  const order = new db.Orders(params);
  await order.save();
}

async function update(orderId, params) {
  const order = await getById(orderId);
  Object.assign(order, params);
  await order.save();
}

async function getById(orderId) {
  const order = await db.Orders.findByPk(orderId);
  if (!order) throw "order not found";
  return order;
}

async function remove(orderId) {
  const order = await db.Orders.destroy({
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
async function getByCustId(custId) {
  const order = await db.Orders.findAll({
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
  getByCustId,
};
