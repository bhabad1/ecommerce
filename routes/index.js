var express = require("express");
var router = express.Router();
const customerRoute = require("../routes/customers");
const orderRoute = require("../routes/orders");
const productRoute = require("../routes/products");
const orderDetailRoute = require("../routes/orderDetails");
const verifyToken = require("../middleware/auth");

/* GET home page. */
router.use("/customer", customerRoute);
router.use("/orders", verifyToken, orderRoute);
router.use("/products", productRoute);
router.use("/order_details", verifyToken, orderDetailRoute);

module.exports = router;
