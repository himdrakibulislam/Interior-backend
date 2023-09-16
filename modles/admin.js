const validator = require("validator");
const Mongoose = require("mongoose");
const AdminSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide valid e-mail"],
    trim: true,
    lowercase: true,
    unique: [true,"Email already exists!"],
    required: [true, "E-mail address is required"],
  },
  adminprofile: {
    type:Object
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
