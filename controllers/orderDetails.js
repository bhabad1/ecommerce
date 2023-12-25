const orderService = require("../services/order_details");

let orderCtrl = {};

orderCtrl.getOrderDetails = (req, res, next) => {
  try {
    orderService
      .getByOrderId(req.params.orderId)
      .then((orders) => {
        res.json(orders);
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};

orderCtrl.createOrderDetails = async (req, res, next) => {
  try {
    orderService
      .create(req.body)
      .then(() => res.json({ message: "order successfully created" }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

orderCtrl.updateOrderDetails = (req, res, next) => {
  try {
    orderService
      .update(req.params.orderId, req.params.productId, req.body)
      .then(() => res.json({ message: "order updated" }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

orderCtrl.removeOrderDetails = (req, res, next) => {
  try {
    orderService
      .remove(req.params.orderId)
      .then(() => res.json({ message: "order deleted successfully" }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};
module.exports = orderCtrl;
