const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();
const { adminAuth } = require("../middleware/auth");
const uploader = require("../middleware/uploader");

router.post("/login", adminController.login);
router.get("/admin", adminAuth, adminController.getAdmin);
router.post("/change-password", adminAuth, adminController.changePassword);

router.post(
  "/change-profile",
  [uploader.single("adminprofile"), adminAuth],
  adminController.changeProfile
);

router.post("/create-admin", adminAuth, adminController.createAdmin);

router.get("/get-all-admins", adminAuth, adminController.getAllAdmins);
router.delete("/remove-admin/:id", adminAuth, adminController.removeAdmin);

module.exports = router;
