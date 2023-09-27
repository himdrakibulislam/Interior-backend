const Team = require("../modles/team");
exports.getAllTeamService = async() => {
    return await Team.find({}).sort({ _id: -1 });;
    
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