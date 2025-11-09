require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const connectDB = require("../config/db");

(async () => {
  try {
    await connectDB();
    console.log("Seeding data...");

    await User.deleteMany({});
    await Product.deleteMany({});

    const password = await bcrypt.hash("Pass1234", 10);

    const admin = await User.create({ name: "Admin", email: "admin@example.com", password, role: "admin" });
    const store = await User.create({ name: "Demo Store", email: "store@example.com", password, role: "store" });
    const customer = await User.create({ name: "Demo Customer", email: "customer@example.com", password, role: "customer" });
    const delivery = await User.create({ name: "Demo Delivery", email: "delivery@example.com", password, role: "delivery" });

    await Product.create([
      { storeId: store._id, name: "Rice 5kg", description: "Good rice", price: 40, stock: 50 },
      { storeId: store._id, name: "Cooking Oil 1L", description: "Pure oil", price: 120, stock: 30 }
    ]);

    console.log("Seed complete:");
    console.log("admin@example.com / Pass1234");
    console.log("store@example.com / Pass1234");
    console.log("customer@example.com / Pass1234");
    console.log("delivery@example.com / Pass1234");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
