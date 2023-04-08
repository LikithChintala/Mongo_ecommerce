const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const productController = require("../controllers/productController");

const router = require("express").Router();

router.post('/add', productController.addProduct);

module.exports = router;
