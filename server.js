const dotenv = require("dotenv").config();
const colors = require("colors");
const DBConnect = require("./utils/DBConnect");

const app = require("./app");
DBConnect();

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
