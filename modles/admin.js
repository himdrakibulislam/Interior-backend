const validator = require("validator");
const Mongoose = require("mongoose");
const AdminSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide valid e-mail"],
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "E-mail address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) => {
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 3,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        });
      },
      message: "Password {VALUE} is not strong enough.",
    },
  },
  role: {
    type: String,
    default: "admin",
    required: true,
  },
});

const Admin = Mongoose.model("admins", AdminSchema);
module.exports = Admin;
