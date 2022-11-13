const express = require("express");
const app = express();
const cors = require("cors");
// product route 
const expressRoute = require("./routes/express.route")
// middlewares
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
app.use("/api/v1/express",expressRoute);

module.exports = app;