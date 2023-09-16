const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// product route 
const adminRoute = require("./routes/admin.route");
const projectRoute = require("./routes/project.route");
const teamRoute = require("./routes/team.route");
const pressRoute = require("./routes/press.route");
const contactRoute = require("./routes/contact.route");
const { adminAuth } = require("./middleware/auth");
// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
//routes 

app.get("/", (req, res) => {
  
  res.send("Welcome to server!");
});
app.use("/api/v1/auth",adminRoute);
app.use("/api/v1/contact",contactRoute);
app.use("/api/v1/project",adminAuth,projectRoute);
app.use("/api/v1/team",adminAuth,teamRoute);
app.use("/api/v1/press",adminAuth,pressRoute);

module.exports = app;