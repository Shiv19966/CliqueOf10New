// Login.js
import React, { useState } from "react";
import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css"; 

const Login = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <input
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button className="login-button" onClick={loginUser}>
        Login
      </button>
      <button className="login-button" onClick={() => setState("")}>
        Register
      </button>
      <button
        className="login-button"
        onClick={() => setState("ForgotPassword")}
      >
        Forgot Password
      </button>
    </div>
  );
};

export default Login;
