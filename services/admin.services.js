const Admin = require("../modles/admin");

exports.loginAdmin = async (email) => {
  // password: 33TTjj66kdhjh
  const result = await Admin.findOne({ email });
  return result;
};
exports.getAdminService = async (id) => {
  const result = await Admin.findOne({ _id: id }).select("-password"); // Exclude the 'password' property
  return result;
};
// create admin
exports.createAdminService = async (data) => {
  const result = await Admin.create(data);
  return result;
};
// modify admin
exports.modifyAdmin = async (id,data) => {
  const result = await Admin.updateOne({ _id: id },data);
  return result;
};
// get all admins
exports.getAllAdminsService = async () => {
  const result = await Admin.find({}).select("-password");
  return result;
};
// get all admins
exports.deleteAdminService = async (id) => {
  const result = await Admin.deleteOne({_id: id});
  return result;
};
