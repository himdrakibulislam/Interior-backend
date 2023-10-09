const mongoose = require("mongoose");
//Schema
const projectSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featuredImage:{
    type:Object,
    required : true
  },
  photo: {
    type: String
  },
  galleryImages:{
    type:Array,
  }
});
// mongoose middleware
// pre
/* productSchema.pre('save',function(next){
    console.log("Before Saving Data");
     // if(product.quantity == 0){
      //   product.status = 'out-of-stock'
      // }
    next();
  }); */
//post
/* productSchema.post('save',function(doc,next){
    console.log("After saving data");
    next();
  }); */
// insert a function into schema
/* productSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`);
  } */
// crating product model
const Project = mongoose.model("projects", projectSchema);
module.exports = Project;
