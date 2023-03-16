import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [input, setInput] = useState({
    name: "",
    price: "",
    company: "",
    category: "",
  });
  const navigate = useNavigate();
  const [err, setErrorMsg] = useState(false);
  const addProduct = async () => {
    const { name, price, company, category } = input;
    if (!name || !price || !company || !category) {
      setErrorMsg(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:4000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, company, category, userId }),
      headers: {
        "Content-Type": "application/json",
        authentication: `bearer ${localStorage.getItem("token")}`,
      },
    });
    result = await result.json();
    navigate("/");
  };
  return (
    <div className="add">
      <h1>Add Product</h1>
      <input
        type={"text"}
        placeholder="Enter your name"
        className="inputbox"
        onChange={(e) => setInput({ ...input, name: e.target.value })}
        name="name"
        value={input.name}
      />
      {err && !input.name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type={"text"}
        placeholder="Enter your price"
        className="inputbox"
        onChange={(e) => setInput({ ...input, price: e.target.value })}
        name="price"
        value={input.price}
      />
      {err && !input.price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        type={"text"}
        placeholder="Enter your category"
        className="inputbox"
        onChange={(e) => setInput({ ...input, category: e.target.value })}
        name="category"
        value={input.category}
      />
      {err && !input.category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        type={"text"}
        placeholder="Enter your company"
        className="inputbox"
        onChange={(e) => setInput({ ...input, company: e.target.value })}
        name="company"
        value={input.company}
      />
      {err && !input.company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button className="addBtn" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
