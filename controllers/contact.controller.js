const mongoose = require("mongoose");
const {
  createContactService,
  deteleClientService,
} = require("../services/contact.services");
const { getAllAdminsService } = require("../services/admin.services");
const { mailTransport } = require("../utils/NodeMailer");
const Contact = require("../modles/contact");
// get all team
exports.getAllContact = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = req.query.limit || 10;
  const skip = (page - 1) * perPage;
  try {
    const total = await Contact.countDocuments();
    const result = await Contact.find({})
      .skip(skip)
      .limit(parseInt(perPage))
      .sort({ _id: -1 });

    res.status(200).json({
      message: "success",
      total,
      data: result,
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
    admins.forEach((admin) => {
      const mail = mailTransport.sendMail({
        from: email, // sender address
        to: admin.email, // list of receivers
        subject: "Contact", // Subject line
        text: `Contact information has arrived from ${name}.`, // plain text body
        html: `<div style="padding: 8px; ">
        <table >
          <thead>
            <tr>
              <th style="border-style: solid;">Name</th>
              <th style="border-style: solid;">
                ${name}
              </th>
            </tr>
            <tr>
              <th style="border-style: solid;">Email</th>
              <th style="border-style: solid;">
                ${email}
              </th>
            </tr>
            <tr>
              <th style="border-style: solid;">Budget</th>
              <th style="border-style: solid;">
                <span className="font-bold"> &#2547;</span>
                <span className="font-semi-bold">${budget}</span> K
              </th>
            </tr>
            <tr>
              <th style="border-style: solid;">Service</th>
              <th style="border-style: solid;">
                
                <span className="font-semi-bold uppercase">
                  ${serviceType}
                </span>
              </th>
            </tr>
            <tr>
              <th style="border-style: solid;">Est. Time</th>
              <th style="border-style: solid;">
               
                <span className="font-semi-bold uppercase">
                  ${estimateTime} Days 
                </span>
              </th>
            </tr>
          </thead>
        </table>
        <h3 className="text-gray-400">Description</h3>
        <p style="text-align: justify;">${description}</p>
      </div>;
      `, // html body
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
