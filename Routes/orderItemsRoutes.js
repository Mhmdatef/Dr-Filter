const orderItemsController = require("../controllers/orderItemsController.js");
const express = require("express");
const router = express.Router();

router.post("/", orderItemsController.createOrderItem);
router.get("/", orderItemsController.getAllOrderItems);
router.put("/:orderItemId", orderItemsController.updateOrderItem);
router.delete("/:orderItemId", orderItemsController.deleteOrderItem);
router.get("/:orderItemId", orderItemsController.getOrderItemById);
router.get("/:orderItemId/components", orderItemsController.getitemCompoents);
module.exports = router;
