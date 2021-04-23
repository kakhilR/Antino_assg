const jwt = require("jsonwebtoken");

exports.requiresignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWTSECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "authorization is required" });
  }
  next();
};

exports.adminPermission = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "sorry only admin can" });
  }
  next();
};
