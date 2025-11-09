const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/user.model");
const Order = require("../../models/order.model");

// admin: list users
router.get("/users", auth("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// admin: list orders
router.get("/orders", auth("admin"), async (req, res) => {
  const orders = await Order.find().populate("customerId storeId assignedDelivery items.productId");
  res.json(orders);
});

module.exports = router;
