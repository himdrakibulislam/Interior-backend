const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// product route 
const projectRoute = require("./routes/project.route");
const adminRoute = require("./routes/admin.route");
const { adminAuth } = require("./middleware/auth");
// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser())
//routes 
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
app.use("/api/v1/project",adminAuth,projectRoute);
app.use("/api/v1/auth",adminRoute);

module.exports = app;