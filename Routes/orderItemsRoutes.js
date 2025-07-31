const orderItemsController = require("../controllers/orderItemsController.js");
const express = require("express");
const router = express.Router();

router.post("/", orderItemsController.createOrderItem);

module.exports = router;
