const express = require("express");
const contactController = require("../controllers/contact.controller");
const { adminAuth } = require("../middleware/auth");
const router = express.Router();


router.route("/").get(adminAuth,contactController.getAllContact);
router.post(
  "/create",
  contactController.createContact
);

router
  .route("/:id")
  .delete(contactController.deleteContact)
  

module.exports = router;
