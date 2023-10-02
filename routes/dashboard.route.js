const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");
const router = express.Router();

router.route("/").get(dashboardController.dashboard);
router.route("/media").get(dashboardController.getAllMedia);


module.exports = router;
