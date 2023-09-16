const mongoose = require("mongoose");
const {
  getAllContactServices,
  createContactService,
  deteleClientService,
} = require("../services/contact.services");
const {getAllAdminsService} = require('../services/admin.services');
const { mailTransport } = require("../utils/NodeMailer");
// get all team
exports.getAllContact = async (req, res, next) => {
  try {
    const contacts = await getAllContactServices();
    res.status(200).json({
      message: "success",
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
//   create
exports.createContact = async (req, res, next) => {
  try {
    const { email, name, budget, description, serviceType, estimateTime } =
      req.body;

    if (
      !name ||
      !email ||
      !description ||
      !budget ||
      !serviceType ||
      !estimateTime
    ) {
      const jsonbody = {};
      if (!name) {
        jsonbody["name"] = "Name is required.";
      }
      if (!email) {
        jsonbody["email"] = "Email is required.";
      }
      if (!description) {
        jsonbody["description"] = "Description is required.";
      }
      if (!budget) {
        jsonbody["budget"] = "Budget is required.";
      }
      if (!serviceType) {
        jsonbody["serviceType"] = "ServiceType is required.";
      }
      if (!estimateTime) {
        jsonbody["estimateTime"] = "EstimateTime is required.";
      }
      return res.status(400).json(jsonbody);
    }

    const contact = await createContactService({
      email,
      name,
      budget,
      description,
      serviceType,
      estimateTime,
    });
    const admins = await getAllAdminsService();
    admins.forEach(admin => {
      const mail = mailTransport.sendMail({
        from: email, // sender address
        to: admin.email, // list of receivers
        subject: "Contact", // Subject line
        text: "you have got a new contact", // plain text body
        html: `<b>you have got a new contact ${email}</b>`, // html body
      });
      
    });
   
  
    res.status(200).json({
      message: "success",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};

// delete
exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the provided id is not a valid ObjectId, return a 400 Bad Request response
      return res.status(400).json({ message: "Invalid ObjectId" });
    }

    const result = await deteleClientService(id);
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
