//creating the server using express

const express = require("express");
require("./db/config");
const User = require("./db/users");
const cors = require("cors");

const app = express();

// const connectDB = async () => {
//   mongoose.connect("mongodb://localhost:27017/e-comm");
//   const productSchema = new mongoose.Schema({});
//   const product = mongoose.model("product", productSchema);
//   //const data = await product.find({});
//   console.log(data);
// };

//connectDB();

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

app.listen(4000);
