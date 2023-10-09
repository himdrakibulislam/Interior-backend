const Mongoose = require("mongoose");

const PressSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  article: {
    type: Object,
    required: true,
  },
  

  pressPhoto: {
    type: Object,
    required: true,
  },
  author:{
    type: Object
  }
},{ timestamps: true });

const Press = Mongoose.model("blog", PressSchema);
module.exports = Press;
