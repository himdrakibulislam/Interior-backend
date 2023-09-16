const express = require("express");
const projectController = require("../controllers/project.controller");
const uploader = require("../middleware/uploader");
const router = express.Router();

router.route("/projects").get(projectController.getProjects);

router
  .route("/:id")
  .get(projectController.getProjectById)
  .delete(projectController.deleteProject)
  .put(
    uploader.fields([
      { name: "featuredImage", maxCount: 1 },
      { name: "galleryImages", maxCount: 8 },
    ]),
    projectController.updateProject
  );

router.post(
  "/create",
  uploader.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 8 },
  ]),
  projectController.createProject
);

router.post("/delete-project-file", projectController.deleteProjectFile);

module.exports = router;
