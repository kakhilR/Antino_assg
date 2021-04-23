const express = require("express");
const router = express.Router();
const { UpdateProfile, getAllusers } = require("../controllers/users");
const { requiresignin, adminPermission } = require("../middlewares/token");

router.get("/getusers", requiresignin, adminPermission, getAllusers);
router.put("/update/:id", requiresignin, UpdateProfile);

module.exports = router;
