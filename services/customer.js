const db = require("../helpers/db");
const { Sequelize, Op } = require("sequelize");

async function getAllCustomers() {
  const customers = await db.Customers.findAll();
  return customers;
}

async function createCustomer(params) {
  const customer = new db.Customers(params);
  await customer.save();
}

async function updateCustomer(custId, params) {
  const customer = await getCustomerById(custId);
  Object.assign(customer, params);
  await customer.save();
}

async function getCustomerById(custId) {
  const customer = await db.Customers.findByPk(custId);
  if (!customer) throw "Customer not found";
  return customer;
}

async function removeCustomer(custId) {
  const customer = await db.Customers.destroy({
    where: {
      custId,
    },
  });
  return customer;
}
async function getCustomerByEmail(email) {
  const customer = await db.Customers.findOne({
    where: {
      email,
    },
  });
  if (!customer) throw "Customer not found";
  //   console.log("customer is", customer);
  return customer.toJSON();
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  removeCustomer,
  getCustomerByEmail,
};
