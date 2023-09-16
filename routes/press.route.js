const express = require("express");
const pressController = require("../controllers/press.controller");
const router = express.Router();
const uploader = require("../middleware/uploader");

router.route("/all").get(pressController.getPress);
router.post(
  "/create",
  uploader.single("pressPhoto"),
  pressController.createPress
);

router
  .route("/:id")
  .get(pressController.getPressById)
  .delete(pressController.deletePress)
  .put(uploader.single("pressPhoto"), pressController.updatePress);

module.exports = router;
