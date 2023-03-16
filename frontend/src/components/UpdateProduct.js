import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct = () => {
  const [input, setInput] = useState({
    name: "",
    price: "",
    company: "",
    category: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:4000/product/${params.id}`, {
      method: "get",
      headers: {
        authentication: `bearer ${localStorage.getItem("token")}`,
      },
    });
    result = await result.json();
    setInput({ ...input, ...result });
  };

  const updateProduct = async () => {
    const { name, price, company, category } = input;
    console.log(name, price, company, category);
    let result = await fetch(`http://localhost:4000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, company, category }),
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
      <h1>Update Product</h1>
      <input
        type={"text"}
        placeholder="Enter your name"
        className="inputbox"
        onChange={(e) => setInput({ ...input, name: e.target.value })}
        name="name"
        value={input.name}
      />

      <input
        type={"text"}
        placeholder="Enter your price"
        className="inputbox"
        onChange={(e) => setInput({ ...input, price: e.target.value })}
        name="price"
        value={input.price}
      />

      <input
        type={"text"}
        placeholder="Enter your category"
        className="inputbox"
        onChange={(e) => setInput({ ...input, category: e.target.value })}
        name="category"
        value={input.category}
      />

      <input
        type={"text"}
        placeholder="Enter your company"
        className="inputbox"
        onChange={(e) => setInput({ ...input, company: e.target.value })}
        name="company"
        value={input.company}
      />

      <button className="addBtn" onClick={updateProduct}>
        update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
