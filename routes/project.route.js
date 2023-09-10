const express = require("express");
const projectController = require("../controllers/project.controller");
const uploader = require("../middleware/uploader");
const router = express.Router();


router.route("/projects").get(projectController.getProjects);

router.post("/create",uploader.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 8 }]),projectController.createProject);
router.get("/:id",projectController.getProjectById);

router.delete("/delete/:id",projectController.deleteProject); 
router.put("/update/:id",uploader.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 8 }]),projectController.updateProject); 
// router
//      .route("/:id")
//      .patch(productController.updateProduct)
//      .delete(productController.deleteProductById);
module.exports = router;
