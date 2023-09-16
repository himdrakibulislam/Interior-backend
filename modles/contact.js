const validator = require("validator");
const Mongoose = require("mongoose");

const ContactSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  estimateTime: {
    type: String,
    default: false,
  },
  description: {
    type: String,
    default: false,
  },
  budget: {
    type: Number,
    default: false,
  },
},{ timestamps: true });

const Contact = Mongoose.model("contact", ContactSchema);
module.exports = Contact;
