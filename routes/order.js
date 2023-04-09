const orderController = require("../controllers/ordersController");

const router = require("express").Router();

router.post('/create', orderController.createOrder);

module.exports = router;
