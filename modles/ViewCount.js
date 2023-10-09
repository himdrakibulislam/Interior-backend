const Mongoose = require("mongoose");

const ViewCountSchema = new Mongoose.Schema({
  contentId: {
    type: String ,
    required: true,
  },
  ipAddress : {
    type : String,
    required : true
  }
});

const ViewCount = Mongoose.model("viewcount", ViewCountSchema);
module.exports = ViewCount;
