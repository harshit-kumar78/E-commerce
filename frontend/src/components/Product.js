import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);
  const getProducts = async () => {
    let result = await fetch("http://localhost:4000/products", {
      method: "get",
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:4000/product/${id}`, {
      method: "delete",
    });
    getProducts();
  };
  return (
    <div className="text-center">
      <h1>Product List</h1>
      <ul>
        <li>S.NO</li>
        <li>NAME</li>
        <li>BRAND</li>
        <li>CATEGORY</li>
        <li>OPERATION</li>
      </ul>
      {products.map((ele, index) => {
        return (
          <ul key={ele._id}>
            <li>{index + 1}</li>
            <li>{ele.name}</li>
            <li>{ele.company}</li>
            <li>{ele.category}</li>
            <li>
              <button onClick={() => deleteProduct(ele._id)}>delete</button>
              <Link to={`/update/${ele._id}`}>update</Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Product;
