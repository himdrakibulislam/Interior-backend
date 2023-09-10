const Admin = require("../modles/admin");

exports.loginAdmin = async (email) => {
  // password: 33TTjj66kdhjh
  const result = await Admin.findOne({ email });
  return result;
};
exports.getAdmin = async (id) => {
  // password: 33TTjj66kdhjh
  const result = await Admin.findOne({ _id: id }).select("-password"); // Exclude the 'password' property

  return result;
};
