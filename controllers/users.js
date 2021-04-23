const User = require("../models/UserModel");

exports.getAllusers = (req, res) => {
  User.find({}).exec((err, usersdata) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ data: usersdata });
    }
  });
};

exports.UpdateProfile = async (req, res) => {
  try {
    // const _id = req.params.id;
    const updatedata = Object.keys(req.body);

    if (updatedata.includes("email")) {
      return res.status(400).json({ message: "cannot update email" });
    } else {
      await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }).exec((err, Updata) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json({ sucess: true, data: Updata });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
