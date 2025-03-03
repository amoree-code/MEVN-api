const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const authRouter = require("./routers/auth");
const productRouter = require("./routers/product");
const cartRouter = require("./routers/cart");

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("MongoDB Is Ok"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(8070, () => {
  console.log("BackEnd Server Is Running");
});
