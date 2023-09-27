const express = require("express");
const router = express.Router();
const frontController = require('../controllers/front.controller');
router.route('/projects').get(frontController.getAllProjectsFront);

module.exports = router;