//imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("database created"))
  .catch((err) => console.log(err));

app.use(express.json());

const port = process.env.PORT || 8000;

//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const productsRoutes = require("./routes/uploadproducts");

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", productsRoutes);

app.listen(port, () => console.log(`server is up and running on ${port}`));
