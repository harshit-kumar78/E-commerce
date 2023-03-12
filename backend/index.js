//creating the server using express

const express = require("express");
require("./db/config");
const User = require("./db/User");
const cors = require("cors");
const productModel = require("./db/Product");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  let result = await User.findOne(req.body).select("-password");
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new productModel(req.body);
  let new_product = await product.save();
  console.log(new_product);
  res.send(new_product);
});

app.get("/products", async (req, res) => {
  const products = await productModel.find({});
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no product found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  let id = req.params.id;
  result = await productModel.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});
app.listen(4000);
