// src/components/Login.js

import { computeHeadingLevel } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../services/APIService";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    try {
      const res = await login(payload);
      if (res) {
        setUser(res.data["data"]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(user);
    if(user){
      localStorage.setItem("userID", user['id'] );
      localStorage.setItem("userdata", JSON.stringify(user))
    }

    if (user["role"] === "TRAVELLER") {
      navigate("/traveller_dashboard", { replace: true, state: user });
    } else if (user["role"] === "TRANSPORT_MANAGER") {
      navigate("/transport_manager_dashboard", { replace: true, state: user });
    } else {
      console.log("Login Failed");
    }
  }, [user]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
