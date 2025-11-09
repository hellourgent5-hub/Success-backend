const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Order = require("../../models/order.model");

// get order by id (authorized roles)
router.get("/:id", auth(), async (req, res) => {
  const order = await Order.findById(req.params.id).populate("customerId storeId assignedDelivery items.productId");
  if (!order) return res.status(404).json({ message: "Not found" });
  res.json(order);
});

// admin can update status
router.patch("/:id/status", auth("admin"), async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Not found" });
  order.status = status;
  await order.save();
  res.json(order);
});

module.exports = router;
