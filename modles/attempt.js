const Mongoose = require("mongoose");

const AttemptSchema = new Mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    attempt: {
      type: Number,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Attempt = Mongoose.model("attempt", AttemptSchema);
module.exports = Attempt;
