const Team = require("../modles/team");
exports.getAllTeamService = async() => {
    return await Team.find({});
    
}
exports.createTeamService = async(team) => {
    return await Team.create(team);
    
}
exports.findByIdTeamService = async(id) => {
    return await Team.findOne({_id:id});
    
}
exports.updateTeamService = async(id,data) => {
    return await Team.updateOne({_id:id},data);
}
exports.deteleTeamService = async(id) => {
    return await Team.deleteOne({_id:id});
}