const mongoose = require("mongoose");
const DBconnect = async () => {
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
await mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(()=>{
  console.log('Database connection is successful'.green.bold);
}).catch(err => console.log(err));
}

module.exports = DBconnect;