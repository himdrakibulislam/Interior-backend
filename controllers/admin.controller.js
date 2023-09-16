const {
  loginAdmin,
  modifyAdmin,
  createAdminService,
  getAllAdminsService,
  getAdminService,
  deleteAdminService,
} = require("../services/admin.services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { deleteFile } = require("../utils/deleteFile");
const  mongoose  = require("mongoose");
const jwtSecret = process.env.JSONWEBTOKEN_SECRATE;


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter Email or Password",
      });
    }

    const admin = await loginAdmin(email);
    if (!admin) {
      res.status(400).json({
        message: "Invalid Information!",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, admin.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: admin._id, email, role: admin.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            data: {
              adminId : admin._id,
              token
            }
          });
        } else {
          res.status(400).json({
            message: "Wrong Password!",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
exports.getAdmin = async (req, res, next) => {
  try {
    const admin = await getAdminService(req.decodedToken.id);
    res.status(200).json({
      message: "success",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
// change password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentpassword, newpassword, confirmpassword } = req.body;
    if (!currentpassword && !newpassword && !confirmpassword) {
      res.status(201).json({
        message:
          "Current Password, New Password And Confirm Password  required",
      });
    }
    const auth = req?.decodedToken;
    const admin = await loginAdmin(auth.email);
    if (!admin) {
      res.status(400).json({
        message: "Admin not found",
      });
    } else {
      const passwordMatched = await bcrypt.compare(
        currentpassword,
        admin.password
      );
      if (!passwordMatched) {
        return res.status(400).json({
          message: "Current Password is Wrong",
        });
      }

      if (newpassword !== confirmpassword) {
        return res.status(400).json({ message: "New passwords do not match" });
      }

      const hash = await bcrypt.hash(newpassword, 10);
      const result = await modifyAdmin(auth.id, { password: hash });

      res.status(201).json({
        message: "Password Changed Successfully",
        data : result,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "success",
      error,
    });
  }
};

// change profile
exports.changeProfile = async (req, res, next) => {
  try {
    const auth = req.decodedToken;
    const admin = await getAdminService(auth.id);

    if (admin?.adminprofile?.filename) {
      deleteFile(`public/uploads/profile/${admin.adminprofile.filename}`);
    }
    const result = await modifyAdmin(admin._id, { adminprofile: req.file });

    res.status(200).json({
      message: "success",
      data : result,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
// create admin
exports.createAdmin = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be 8 characters" });
    }
    const emailfind = await loginAdmin(email);
    if (emailfind) {
      return res.status(400).json({ message: "Email is already exists" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Confirm Password does not match" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const result = await createAdminService({
      username,
      email,
      password: hashPass,
    });
    res.status(200).json({
      message: "success",
      data: result?.username,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error
    });
  }
};
// get all admins 
exports.getAllAdmins = async (req, res, next) => {
  try {
    
    const result = await getAllAdminsService();
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
// remove admin 
exports.removeAdmin = async (req, res, next) => {
  try {
    const {id} =  req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const admins = await getAllAdminsService();
    if(admins.length === 1) {
      return res.status(400).json({ message: "Admin is not removeable" });
    }
    const removeAdmin = await getAdminService(id)
    if(!removeAdmin){
      return res.status(400).json({ message: "Admin not found" });
    }
    if(removeAdmin.adminprofile){
      deleteFile(`public/uploads/profile/${removeAdmin.adminprofile.filename}`)
    }
    const result = await deleteAdminService(removeAdmin._id)

    res.status(200).json({
      message: "success",
      data:result,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
