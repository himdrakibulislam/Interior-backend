const mongoose = require("mongoose");
//Schema
const expressSchema = mongoose.Schema({
    // name:{
    //   type:String,
    //   required:[true,"Please provide a name for this product"],
    //   trim: true,
    //   unique:[true,"Name must be unique"],
    //   minLength:[3,"Name must be at least 3 characters"],
    //   maxLength:[100,"Name is too large"]
    // },
    // description: {
    //   type:String,
    //   required:true
    // },
    // price:{
    //   type:Number,
    //   required:true,
    //   min:[0,"Price can't be negative"]
    // },
  
    // quantity:{
    //   type:Number,
    //   required:true,
    //   min:[0,"Quantity can't be negative"],
    //   validate:{
    //     validator:(value)=>{
    //       const isInteger = Number.isInteger(value);
    //       if(isInteger){
    //         return true;
    //       }else{
    //         return false;
    //       }
    //     }
  
    //   },
    //   message:"Quantity must be integer"
    // },
   
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
  const Express = mongoose.model("Product",expressSchema);
  module.exports = Express;