const {
  getContactServices,
  getContactTotalServices,
} = require("../services/dashboard.services");
const Project = require("../modles/project");
const Team = require("../modles/team");
const Press = require("../modles/press");

exports.dashboard = async (req, res, next) => {
  try {
    const total = await getContactTotalServices();
    const contacts = await getContactServices();
    const projects = await Project.estimatedDocumentCount();
    const team = await Team.estimatedDocumentCount();
    const press = await Press.estimatedDocumentCount();
    res.status(200).json({
      message: "success",
      data: {
        contacts: contacts,
        total: total,
        count: {
          projects: projects,
          members: team,
          press: press,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
