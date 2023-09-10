const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JSONWEBTOKEN_SECRATE;
exports.adminAuth = (req, res, next) => {
    const token = req?.headers?.authorization?.split('Bearer ')[1];
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(401).json({ message: "Not authorized"})
          } else {
            req.decodedToken = decodedToken
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }