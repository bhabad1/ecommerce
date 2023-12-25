var express = require("express");
var router = express.Router();
const productCtrl = require("../controllers/product");
const verifyToken = require("../middleware/auth");

/* GET users listing. */
router.get("/", verifyToken, productCtrl.getAllProducts);
router.get("/:productId", verifyToken, productCtrl.getProductById);
// router.get("/:orderId", verifyToken, productCtrl.getProductByOrderId);
router.post("/", verifyToken, productCtrl.createProduct);
router.put("/:productId", verifyToken, productCtrl.updateProduct);
router.delete("/:productId", verifyToken, productCtrl.removeProduct);

module.exports = router;
