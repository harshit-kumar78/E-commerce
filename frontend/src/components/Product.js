import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
  return (
    <div className="text-center">
      <h1>Product List</h1>
      <ul>
        <li>S.NO</li>
        <li>NAME</li>
        <li>BRAND</li>
        <li>CATEGORY</li>
      </ul>
      {products.map((ele, index) => {
        return (
          <ul>
            <li>{index + 1}</li>
            <li>{ele.name}</li>
            <li>{ele.company}</li>
            <li>{ele.category}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default Product;
