const express = require("express");
const projectController = require("../controllers/project.controller");
const uploader = require("../middleware/uploader");
const { adminAuth } = require("../middleware/auth");
const router = express.Router();

router.route("/projects").get(projectController.getProjects);

router
  .route("/:id")
  .get(projectController.getProjectById)
  .delete(adminAuth, projectController.deleteProject)
  .put(
    [
      adminAuth,
      uploader.fields([
        { name: "featuredImage", maxCount: 1 },
        { name: "galleryImages", maxCount: 8 },
      ]),
    ],
    projectController.updateProject
  );

router.post(
  "/create",
  [
    adminAuth,uploader.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 8 },
  ])],
  projectController.createProject
);

router.post("/delete-project-file",adminAuth, projectController.deleteProjectFile);

module.exports = router;
