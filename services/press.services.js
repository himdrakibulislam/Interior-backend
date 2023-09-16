const Press = require("../modles/press");
exports.getAllPressService = async() => {
    return await Press.find({});
    
}
exports.createPressService = async(data) => {
    return await Press.create(data);
    
}
exports.findByIdPressService = async(id) => {
    return await Press.findOne({_id:id});
    
}
exports.updatePressService = async(id,data) => {
    return await Press.updateOne({_id:id},data);
}
exports.detelePressService = async(id) => {
    return await Press.deleteOne({_id:id});
}