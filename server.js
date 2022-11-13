const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");

const app = require("./app");

// database connection mongodb atlas

// mongoose.connect(`mongodb+srv://Assignment:${process.env.DATABASE_PASSWORD}@cluster0.vrvp9pa.mongodb.net/?retryWrites=true&w=majority`,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }).then(()=>{
//   console.log('Database connection is successful'.green.bold);
// });

// database connection local
mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
  console.log('Database connection is successful'.green.bold);
});
// DBConnect();

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

