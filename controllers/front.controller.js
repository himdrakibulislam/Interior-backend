const {getProjectsServices}  = require('../services/project.services');

exports.getAllProjectsFront = async (req, res, next) => {
    try {
        const projects = await getProjectsServices()
      res.status(200).json({
        message: "success",
        data: projects,
        },
      )
    } catch (error) {
      res.status(400).json({
        message: "error",
        error,
      });
    }
  };