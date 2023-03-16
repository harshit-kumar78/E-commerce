//creating the server using express

const express = require("express");
require("./db/config");
require("dotenv").config();
const User = require("./db/User");
const cors = require("cors");
const productModel = require("./db/Product");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  // result = JSON.parse(result);
  delete result.password;

  jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      res.send({ result, auth: token });
    }
  });
});

app.post("/login", async (req, res) => {
  let result = await User.findOne(req.body).select("-password");
  if (result) {
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "invalid token" });
      } else {
        res.send({ result, auth: token });
      }
    });
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new productModel(req.body);
  let new_product = await product.save();
  console.log(new_product);
  res.send(new_product);
});

app.get("/products", verifyToken, async (req, res) => {
  const products = await productModel.find({});
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no product found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  let id = req.params.id;
  result = await productModel.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let id = req.params.id;
  const product = await productModel.findOne({ _id: new ObjectId(id) });
  if (product) {
    res.send(product);
  } else {
    res.send({ status: "no data found" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  const result = await productModel.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: req.body,
    }
  );
  const { modifiedCount, acknowledged, matchedCount } = result;

  if (modifiedCount == 1 && matchedCount) {
    res.send(result);
  } else if (modifiedCount == 0 && matchedCount) {
    res.send({ status: "no data modified" });
  } else {
    res.send({ status: "no data found" });
  }
});
function verifyToken(req, res, next) {
  let token = req.headers.authentication;
  // let token = "bearer lklkdfkdsfsldfkgfdjgkj";
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(400).send({ result: "invalid token " });
      } else {
        next();
      }
    });
  } else {
    res.status(400).send({ result: "please add token the header" });
  }
}
app.get("/search/:key", verifyToken, async (req, res) => {
  const result = await productModel.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});
app.all("*", (req, res) => {
  res.send({ result: "invalid path" });
});
app.listen(process.env.PORT || 5000, () =>
  console.log(`application started on ${process.env.PORT}`)
);
