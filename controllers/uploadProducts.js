const Product = require("../models/uploadModel.js");

exports.addProduct = (req, res) => {
  const product = ({ ProductName, description, price } = req.body);

  if (!ProductName || !description || !price) {
    res.status(400).jspn({ message: "all fields required" });
  }

  const Upload = new Product(product);
  Upload.save((err, data) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (data) {
      return res.status(200).json({ data });
    }
  });
};

exports.getAllProducts = (req, res) => {
  Product.find({}).exec((error, data) => {
    if (error) return res.status(400).json({ error });
    else {
      if (data.length > 0) {
        res.status(200).json({ data });
      } else {
        return res.status(404).json({
          message: "No Products found please wait while admin add products",
        });
      }
    }
  });
};

exports.UpdateProducts = (req, res) => {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
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
};

exports.getProduct = (req, res) => {
  Product.findById({ _id: req.params.id }).exec((err, product) => {
    if (err) {
      return res.status(400).json({ error });
    } else {
      return res.status(200).json({ product });
    }
  });
};
