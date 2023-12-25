var express = require("express");
var router = express.Router();
const orderDetlCtrl = require("../controllers/orderDetails");

/* GET users listing. */
router.get("/:orderId", orderDetlCtrl.getOrderDetails);
router.post("/", orderDetlCtrl.createOrderDetails);
router.put("/:orderId/:productId", orderDetlCtrl.updateOrderDetails);
router.delete("/:orderId", orderDetlCtrl.removeOrderDetails);

module.exports = router;
