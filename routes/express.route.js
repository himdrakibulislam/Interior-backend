const express = require('express');
const expressController = require('../controllers/express.controller')
const router = express.Router();


router
     .route("/")
     .get(expressController.getExpess)
     

// router
//      .route("/:id")
//      .patch(productController.updateProduct)
//      .delete(productController.deleteProductById);
module.exports = router;