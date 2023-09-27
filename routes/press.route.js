const express = require("express");
const pressController = require("../controllers/press.controller");
const router = express.Router();
const uploader = require("../middleware/uploader");
const { adminAuth } = require("../middleware/auth");

router.route("/all").get(pressController.getPress);
router.post(
  "/create",
  [adminAuth,uploader.single("pressPhoto")],
  pressController.createPress
);

router
  .route("/:id")
  .get(pressController.getPressById)
  .delete(adminAuth,pressController.deletePress)
  .put([adminAuth,uploader.single("pressPhoto")], pressController.updatePress);

module.exports = router;
