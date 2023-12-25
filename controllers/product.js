const productService = require("../services/product");
const NodeCache = require("node-cache");

const productCache = new NodeCache({ stdTTL: 500 });

let productCtrl = {};
productCtrl.getAllProducts = (req, res, next) => {
  try {
    productService
      .getAll()
      .then((products) => res.json(products))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

productCtrl.getProductById = (req, res, next) => {
  try {
    if (productCache.has(req.params.productId)) {
      return res.json(productCache.get(req.params.productId));
    } else {
      productService
        .getById(req.params.productId)
        .then((product) => {
          productCache.set(req.params.productId, product);
          res.json(product);
        })
        .catch(next);
    }
  } catch (error) {
    next(error);
  }
};
productCtrl.getProductByOrderId = (req, res, next) => {
  try {
    if (productCache.has(req.params.orderId)) {
      return res.json(productCache.get(req.params.orderId));
    } else {
      productService
        .getByOrderId(req.params.orderId)
        .then((product) => {
          productCache.set(req.params.orderId, product);
          res.json(product);
        })
        .catch(next);
    }
  } catch (error) {
    next(error);
  }
};

productCtrl.createProduct = async (req, res, next) => {
  try {
    productService
      .create(req.body)
      .then(() => res.json({ message: "product successfully created" }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

productCtrl.updateProduct = (req, res, next) => {
  try {
    productService
      .update(req.params.productId, req.body)
      .then(() => res.json({ message: "product updated" }))
      .catch(next);
  } catch (error) {
    next(error);
  }
};

productCtrl.removeProduct = (req, res, next) => {
  try {
    productService
      .remove(req.params.productId)
      .then(() => {
        productCache.del(req.params.productId);
        res.json({ message: "product deleted successfully" });
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};
module.exports = productCtrl;
