import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    let result = await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("please enter correct details");
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type={"text"}
        placeholder="Enter Email"
        className="inputbox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={"password"}
        placeholder="Enter Password"
        className="inputbox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" className="signBtn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
