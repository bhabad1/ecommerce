const customerService = require("../services/customer");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const customerCache = new NodeCache({ stdTTL: 200 });

const bcryptUtil = require("../helpers/bcrypt.util");
const config = require("../config.json");

let custCtrl = {};
custCtrl.getAllCustomers = (req, res, next) => {
  try {
    customerService
      .getAllCustomers()
      .then((customers) => res.json(customers))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

custCtrl.createCustomer = async (req, res, next) => {
  try {
    const hashedPassword = await bcryptUtil.createHash(req.body.password);

    customerService
      .createCustomer({ ...req.body, password: hashedPassword })
      .then(() => res.json({ message: "Customer successfully registered" }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

custCtrl.updateCustomer = (req, res, next) => {
  try {
    customerService
      .updateCustomer(req.params.custId, req.body)
      .then(() => {
        // if (customerCache.has(req.params.custId)) {
        //   customerCache.set(req.params.custId, customer);
        // }
        res.json({ message: "Customer updated" });
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};

custCtrl.getCustomerById = (req, res, next) => {
  try {
    if (customerCache.has(req.params.custId)) {
      return res.json(customerCache.get(req.params.custId));
    } else {
      customerService
        .getCustomerById(req.params.custId)
        .then((customer) => {
          customerCache.set(req.params.custId, customer);
          res.json(customer);
        })
        .catch(next);
    }
  } catch (error) {
    next(error);
  }
};

custCtrl.login = async (req, res, next) => {
  try {
    const customer = await customerService.getCustomerByEmail(req.body.email);
    if (customer) {
      console.log(customer.password);
      const isMatched = await bcryptUtil.compareHash(
        req.body.password,
        customer.password
      );
      if (isMatched) {
        const token = jwt.sign({ email: customer.email }, config.jwt_secrete, {
          expiresIn: "1h",
        });
        return res.json({ ...customer, token });
      }
    }
    return res.status(400).json({ message: "Unauthorized." });
  } catch (error) {
    next(error);
  }
};

custCtrl.removeCustomer = (req, res, next) => {
  try {
    customerService
      .removeCustomer(req.params.custId)
      .then(() => {
        if (customerCache.has(req.params.custId)) {
          customerCache.del(req.params.custId);
        }
        res.json({ message: "Customer deleted successfully" });
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};
module.exports = custCtrl;
