const mongoose = require("mongoose");
const DBconnect = async () => {
  // database connection mongodb atlas

await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.iy7eac8.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(()=>{     
    console.log('Database connection is successful'.green.bold);
  }); 

  // database connection local
  // await mongoose
  //   .connect(process.env.DATABASE_LOCAL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false,
  //   })
  //   .then(() => {
  //     console.log("Database connection is successful".green.bold);
  //   })
  //   .catch((err) => console.log(err));
};

module.exports = DBconnect;


