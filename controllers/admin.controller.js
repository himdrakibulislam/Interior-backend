const { loginAdmin, getAdmin } = require("../services/admin.services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
        message: "Login not successful",
        error: "User not found",
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
            auth: admin._id,
            token,
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
      message: "Failed",
      error,
    });
  }
};
exports.getAdmin = async (req, res, next) => {
  try {
    const admin = await getAdmin(req.decodedToken.id);
    res.status(200).json({
      status: "Success",
      admin,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error,
    });
  }
};
