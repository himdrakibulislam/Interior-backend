const express = require('express');
const adminController = require('../controllers/admin.controller');
const router = express.Router();
const {adminAuth} = require("../middleware/auth");
router
.post('/login',adminController.login);
router.get('/admin',adminAuth,adminController.getAdmin);
module.exports = router;