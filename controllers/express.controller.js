const { getExpressService } = require("../services/express.services")

exports.getExpess = async(req,res,next) =>{
  try {
    const result = await getExpressService();
    res.status(200).json({
      status:"Success",
      data:result
    })
  } catch (error) {
    res.status(400).json({
      status:"Failed",
      error,
    })
  }
}