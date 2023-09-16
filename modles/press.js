const validator = require("validator");
const Mongoose = require("mongoose");

const PressSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  articleURL: {
    type: Object,
    required: true,
  },

  pressPhoto: {
    type: Object,
    required: true,
  }
});

const Press = Mongoose.model("press", PressSchema);
module.exports = Press;
