const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");

// public: list products
router.get("/products", async (req, res) => {
  const q = req.query.q ? { name: { $regex: req.query.q, $options: "i" } } : {};
  const list = await Product.find(q);
  res.json(list);
});

// create product (store only)
router.post("/products", auth("store"), async (req, res) => {
  const product = new Product({ ...req.body, storeId: req.user.id });
  await product.save();
  res.json(product);
});

// store: list own orders
router.get("/orders", auth("store"), async (req, res) => {
  const orders = await Order.find({ storeId: req.user.id }).populate("customerId items.productId assignedDelivery");
  res.json(orders);
});

module.exports = router;
