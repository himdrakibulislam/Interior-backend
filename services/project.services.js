const Project = require("../modles/project");

exports.getProjectsServices = async() =>{
    const projects = await Project.find({});
    return projects;
}
exports.createProjectService = async(project) =>{
    const result = await Project.create(project);
    return result;
}
exports.getProjectByIdService = async(id) =>{
    const result = await Project.findOne({_id:id });
    return result;
}
exports.deleteProjectService = async(id) =>{
    const result = await Project.deleteOne({_id:id });
    return result;
}
// update project 
exports.updateProjectService = async(id,data) =>{
    const result = await Project.updateOne({_id:id },data);
    return result;
}