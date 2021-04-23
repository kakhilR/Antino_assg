const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashedpassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.virtual("password").set(function (password) {
  this.hashedpassword = bcrypt.hashSync(password, 10);
});

UserSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashedpassword);
  },
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
