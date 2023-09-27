const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");
const router = express.Router();

router.route("/").get(dashboardController.dashboard);


module.exports = router;
