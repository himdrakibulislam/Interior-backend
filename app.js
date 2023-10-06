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
const dashboardRoute = require("./routes/dashboard.route");
const frontRoute = require("./routes/front.route");
const { adminAuth } = require("./middleware/auth");

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
//routes 

app.get("/", async (req, res) => {
  res.send("Welcome!");
});
app.use("/api/v1/auth",adminRoute);
app.use("/api/v1/dashboard",adminAuth,dashboardRoute);
app.use("/api/v1/contact",contactRoute);
app.use("/api/v1/project",projectRoute);
app.use("/api/v1/team",teamRoute);
app.use("/api/v1/press",pressRoute);

// front 
// app.use("/api/v1/",frontRoute);



module.exports = app;