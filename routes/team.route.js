const express = require("express");
const teamController = require("../controllers/team.controller");
const router = express.Router();
const uploader = require("../middleware/uploader");

// routes
router.route("/all").get(teamController.getTeam);
router.post(
  "/create",
  uploader.single("teamProfile"),
  teamController.createTeam
);

router
  .route("/:id")
  .get(teamController.getTeamById)
  .delete(teamController.deleteTeam)
  .put(uploader.single("teamProfile"), teamController.updateTeam);

module.exports = router;
