var express = require("express");
var router = express.Router();
const orderCtrl = require("../controllers/order");

/* GET users listing. */
router.get("/order/:custId", orderCtrl.getAllOrdersByCustomerId);
router.get("/:orderId", orderCtrl.getOrderById);
router.post("/", orderCtrl.createOrder);
router.put("/:orderId", orderCtrl.updateOrder);
router.delete("/:orderId", orderCtrl.removeOrder);

module.exports = router;
