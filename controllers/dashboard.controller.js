const {
  getContactServices,
  getContactTotalServices,
} = require("../services/dashboard.services");
const Project = require("../modles/project");
const Team = require("../modles/team");
const Press = require("../modles/press");
const ViewCount = require("../modles/ViewCount");

exports.dashboard = async (req, res, next) => {
  try {
    const total = await getContactTotalServices();
    const contacts = await getContactServices();
    const projects = await Project.estimatedDocumentCount();
    const team = await Team.estimatedDocumentCount();
    const press = await Press.estimatedDocumentCount();
    const views = await ViewCount.countDocuments();
    res.status(200).json({
      message: "success",
      data: {
        contacts: contacts,
        total: total,
        count: {
          projects: projects,
          members: team,
          press: press,
          views
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
// media
exports.getAllMedia = async (req, res, next) => {
  try {
    let media = [];
    const projects = await Project.find({});
    const team = await Team.find({});
    const press = await Press.find({});

    projects.forEach((project) => {
      media.push(project.featuredImage);
      project.galleryImages.forEach(image => media.push(image));
    });

    team.forEach(tm => media.push(tm.teamProfile));

    press.forEach(pr => media.push(pr.pressPhoto));

    res.status(200).json({
      message: "success",
      data: media
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
