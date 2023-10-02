const {
  createTeamService,
  findByIdTeamService,
  deteleTeamService,
  updateTeamService,
} = require("../services/team.services");
const mongoose = require("mongoose");
const { deleteFile } = require("../utils/deleteFile");
const Team = require("../modles/team");

// get all team
exports.getTeam = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = req.query.limit || 10; 
  const skip = (page - 1) * perPage; 
  try {
    const total = await Team.countDocuments();
    const team = await Team.find({})
    .skip(skip)
    .limit(parseInt(perPage))
    .sort({ _id: -1 });
    
    res.status(200).json({
      message: "success",
      total,
      data: team,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
//   create
exports.createTeam = async (req, res, next) => {
  try {
    const { name, designation } = req.body;
    const designer = { name, designation, teamProfile: req.file };
    const team = await createTeamService(designer);

    res.status(200).json({
      message: "success",
      data: team,
    });
  } catch (error) {
   
    res.status(400).json({
      message: "error",
      error,
    });
  }
};

// get by Id
exports.getTeamById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the provided id is not a valid ObjectId, return a 400 Bad Request response
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const team = await findByIdTeamService(id);

    res.status(200).json({
      message: "success",
      data: team,
    });
  } catch (error) {
    
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
// update team
exports.updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the provided id is not a valid ObjectId, return a 400 Bad Request response
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const team = await findByIdTeamService(id);

    if (req.file) {
      deleteFile(`public/uploads/team/${team.teamProfile.filename}`);
    }

    const { name, designation } = req.body;
    const updateDesigner = { name, designation };
    if (req.file) {
      updateDesigner["teamProfile"] = req.file;
    }
    const result = await updateTeamService(id, updateDesigner);
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
 
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
// delete
exports.deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the provided id is not a valid ObjectId, return a 400 Bad Request response
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const team = await findByIdTeamService(id);

    if (team?.teamProfile?.filename) {
      deleteFile(`public/uploads/team/${team.teamProfile.filename}`);
    }

    const result = await deteleTeamService(id);
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
