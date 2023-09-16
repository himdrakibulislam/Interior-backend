const {
    getAllPressService, createPressService, findByIdPressService, updatePressService, detelePressService,
  } = require("../services/press.services");
  const mongoose = require("mongoose");
  const { deleteFile } = require("../utils/deleteFile");
  
  // get all team
  exports.getPress = async (req, res, next) => {
    try {
      const press = await getAllPressService();
  
      res.status(200).json({
        message: "success",
        data: press,
      });
    } catch (error) {
    
      res.status(400).json({
        message: "error",
        error,
      });
    }
  };
  //   create
  exports.createPress = async (req, res, next) => {
    try {
      const { title, articleURL   } = req.body;
      const press = { title,articleURL, pressPhoto: req.file };
      const result = await createPressService(press);
  
      res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
         message: "error",
        error,
      });
    }
  };
  
  // get by Id
  exports.getPressById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // If the provided id is not a valid ObjectId, return a 400 Bad Request response
        return res.status(400).json({ message: "Invalid ObjectId" });
      }
      const press = await findByIdPressService(id);
  
      res.status(200).json({
        message: "success",
        data: press,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error",
        error,
      });
    }
  };
  // update team
  exports.updatePress = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // If the provided id is not a valid ObjectId, return a 400 Bad Request response
        return res.status(400).json({ message: "Invalid ObjectId" });
      }
      const press = await findByIdPressService(id);
  
      if (req.file) {
        deleteFile(`public/uploads/press/${press.pressPhoto.filename}`);
      }
  
      const { title, articleURL } = req.body;
      const updatePress = { title, articleURL };
      if (req.file) {
        updatePress["pressPhoto"] = req.file;
      }
      const result = await updatePressService(id, updatePress);
      res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error",
        error,
      });
    }
  };
  // delete
  exports.deletePress = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // If the provided id is not a valid ObjectId, return a 400 Bad Request response
        return res.status(400).json({ message: "Invalid ObjectId" });
      }
      const press = await findByIdPressService(id);
  
      if (press?.pressPhoto?.filename) {
        deleteFile(`public/uploads/press/${press.pressPhoto.filename}`);
      }
  
      const result = await detelePressService(id);
      res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error",
        error,
      });
    }
  };
  