const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/admin", require("../modules/admin/admin.routes"));
router.use("/store", require("../modules/store/store.routes"));
router.use("/customer", require("../modules/customer/customer.routes"));
router.use("/delivery", require("../modules/delivery/delivery.routes"));
router.use("/orders", require("../modules/orders/orders.routes"));

module.exports = router;
