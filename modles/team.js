const validator = require("validator");
const Mongoose = require("mongoose");

const TeamSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teamProfile: {
    type: Object,
    required: true,
  },

  designation: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Team = Mongoose.model("teams", TeamSchema);
module.exports = Team;
