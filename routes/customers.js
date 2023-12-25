var express = require("express");
var router = express.Router();
const custCtrl = require("../controllers/customer");

/* GET users listing. */
router.get("/", custCtrl.getAllCustomers);
router.get("/:custId", custCtrl.getCustomerById);
router.post("/", custCtrl.createCustomer);
router.post("/login", custCtrl.login);
router.put("/:custId", custCtrl.updateCustomer);
router.delete("/:custId", custCtrl.removeCustomer);

module.exports = router;
