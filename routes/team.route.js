const express = require("express");
const teamController = require("../controllers/team.controller");
const router = express.Router();
const uploader = require("../middleware/uploader");
const { adminAuth } = require("../middleware/auth");

// routes
router.route("/all").get(teamController.getTeam);
router.post(
  "/create",
  [adminAuth,uploader.single("teamProfile")],
  teamController.createTeam
);

router
  .route("/:id")
  .get(teamController.getTeamById)
  .delete(adminAuth,teamController.deleteTeam)
  .put([adminAuth,uploader.single("teamProfile")], teamController.updateTeam);

module.exports = router;
