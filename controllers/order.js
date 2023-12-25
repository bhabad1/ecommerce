const orderService = require("../services/order");
const NodeCache = require("node-cache");

const orderCache = new NodeCache({ stdTTL: 100 });

let orderCtrl = {};

orderCtrl.getAllOrdersByCustomerId = (req, res, next) => {
  try {
    if (orderCache.has(req.params.custId)) {
      return res.json(orderCache.get(req.params.custId));
    } else {
      orderService
        .getByCustId(req.params.custId)
        .then((orders) => {
          orderCache.set(req.params.custId, orders);

          res.json(orders);
        })
        .catch(next);
    }
  } catch (error) {
    next(error);
  }
};
orderCtrl.getOrderById = (req, res, next) => {
  try {
    if (orderCache.has(req.params.orderId)) {
      return res.json(orderCache.get(req.params.orderId));
    } else {
      orderService
        .getById(req.params.orderId)
        .then((order) => {
          orderCache.set(req.params.orderId, order);
          res.json(order);
        })
        .catch(next);
    }
  } catch (error) {
    next(error);
  }
};

orderCtrl.createOrder = async (req, res, next) => {
  try {
    orderService
      .create(req.body)
      .then(() => res.json({ message: "order successfully created" }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

orderCtrl.updateOrder = (req, res, next) => {
  try {
    orderService
      .update(req.params.orderId, req.body)
      .then(() => res.json({ message: "order updated" }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

orderCtrl.removeOrder = (req, res, next) => {
  try {
    orderService
      .remove(req.params.orderId)
      .then(() => {
        orderCache.del(req.params.orderId);
        res.json({ message: "order deleted successfully" });
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};
module.exports = orderCtrl;
