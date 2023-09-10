const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
   
    if (file.fieldname === 'featuredImage') {
      cb(null, 'public/uploads/projects');
    }
     else if (file.fieldname === 'galleryImages') {
      cb(null, 'public/uploads/projects');
    }
    else{
      cb(null, 'public/uploads');
    } 
  }, 
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|jpeg|webp/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpeg"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});
module.exports = uploader;
