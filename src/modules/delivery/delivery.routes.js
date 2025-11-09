const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Order = require("../../models/order.model");

// delivery: accept/complete order
router.post("/pickup", auth("delivery"), async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });
  order.assignedDelivery = req.user.id;
  order.status = "out_for_delivery";
  await order.save();
  res.json(order);
});

router.post("/complete", auth("delivery"), async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });
  if (String(order.assignedDelivery) !== String(req.user.id)) return res.status(403).json({ message: "Not assigned to you" });
  order.status = "delivered";
  await order.save();
  res.json(order);
});

module.exports = router;
