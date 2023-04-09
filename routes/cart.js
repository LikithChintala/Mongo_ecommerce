const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const cartController = require("../controllers/cartController");

const router = require("express").Router();

router.post('/add', cartController.addCart);

module.exports = router;

