import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/003/731/316/original/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg"
        alt="logo-img"
        className="logo"
      />

      {auth ? (
        <ul className=" nav-link nav-ul ">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>
              logout({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-link nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
