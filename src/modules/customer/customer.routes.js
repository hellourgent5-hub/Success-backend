const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Order = require("../../models/order.model");

// customer profile
router.get("/profile", auth("customer"), async (req, res) => {
  res.json({ user: req.user });
});

// customer: create order
router.post("/orders", auth("customer"), async (req, res) => {
  try {
    const { storeId, items } = req.body;
    const total = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
    const order = new Order({
      customerId: req.user.id,
      storeId,
      items,
      total
    });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// list customer orders
router.get("/orders", auth("customer"), async (req, res) => {
  const orders = await Order.find({ customerId: req.user.id }).populate("items.productId storeId assignedDelivery");
  res.json(orders);
});

module.exports = router;
