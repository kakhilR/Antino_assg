const express = require("express");
const router = express.Router();

const {
  addProduct,
  UpdateProducts,
  getAllProducts,
  getProduct,
} = require("../controllers/uploadProducts");
const { requiresignin, adminPermission } = require("../middlewares/token");

router.post("/uploadproducts", requiresignin, adminPermission, addProduct);
router.put(
  "/updateproducts/:id",
  requiresignin,
  adminPermission,
  UpdateProducts
);

router.get("/allproducts", getAllProducts);
router.get("/product/:id", getProduct);

module.exports = router;
