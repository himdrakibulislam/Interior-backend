const {
  getProjectsServices,
  createProjectService,
  getProjectByIdService,
  deleteProjectService,
  updateProjectService,
} = require("../services/project.services");
const mongoose = require("mongoose");
const { deleteFile } = require("../utils/deleteFile");

exports.getProjects = async (req, res, next) => {
  try {
    // console.log(req.ip)
    const result = await getProjectsServices();
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};
// create project
exports.createProject = async (req, res, next) => {
  try {
    // console.log(req.ip)

    const galleryImages = req.files["galleryImages"];
    const featuredImage = req.files["featuredImage"][0];
    const storeProject = {
      galleryImages,
      featuredImage,
      location: req.body.location,
      sector: req.body.sector,
      photo: req.body.photograph,
      description: req.body.description,
    };
    const result = await createProjectService(storeProject);

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};
// get project by id
exports.getProjectById = async (req, res, next) => {
  try {
    // console.log(req.ip)
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the provided id is not a valid ObjectId, return a 400 Bad Request response
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    const result = await getProjectByIdService(id);

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};
// update project
exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the provided id is not a valid ObjectId, return a 400 Bad Request response
      return res.status(400).json({ error: "Invalid ObjectId" });
    }
    const toUpdateData = {
      description: req.body.description,
      location: req.body.location,
      photo: req.body.photo,
      sector: req.body.sector,
    };

    if (req?.files["featuredImage"]?.[0]) {
      const project = await getProjectByIdService(id);

      deleteFile(`public/uploads/projects/${project.featuredImage.filename}`);

      toUpdateData["featuredImage"] = req?.files["featuredImage"][0];
    }

    if (req?.files["galleryImages"]) {
      const project = await getProjectByIdService(id);
      const galleryImages = [...project.galleryImages];

      req?.files["galleryImages"].forEach((img) => galleryImages.push(img));

      toUpdateData["galleryImages"] = galleryImages;
    }

    const result = await updateProjectService(id, toUpdateData);

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};
// delete project
exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the provided id is not a valid ObjectId, return a 400 Bad Request response
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    const project = await getProjectByIdService(id);
    // removing image
    const featuredImage = project.featuredImage;
    const galleryImages = project.galleryImages;
    deleteFile(`public/uploads/projects/${featuredImage.filename}`);
    galleryImages.forEach((image) => {
      deleteFile(`public/uploads/projects/${image.filename}`);
    });
    const result = await deleteProjectService(id);

    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};
