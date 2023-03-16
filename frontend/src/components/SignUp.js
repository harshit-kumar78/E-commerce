import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    if (name && email && password) {
      let result = await fetch("http://localhost:4000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();

      if (result) {
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", result.auth);
        navigate("/");
      }
    } else {
      alert("fields cannot be empty");
    }
  };

  return (
    <form className="register">
      <h1>Register </h1>
      <input
        className="inputbox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputbox"
        type={"email"}
        placeholder={"Enter Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputbox"
        type={"password"}
        placeholder={"Enter password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" className="signBtn" onClick={collectData}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
