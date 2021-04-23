const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ error: "all fields are required" });
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.status(400).json({ error: "Already Registered!" });
    }
  });

  let newUser = new User({
    name,
    email,
    password,
    role: "admin",
  });

  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ user });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ error: "all fields required" });
  }

  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "user with this email does not exit please signup." });
    }

    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWTSECRET,
          {
            expiresIn: "1d",
          }
        );
        const { _id, name, email, role } = user;
        res.status(200).json({
          token,
          user: { _id, name, email, role },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
