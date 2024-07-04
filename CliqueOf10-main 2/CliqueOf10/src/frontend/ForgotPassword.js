// ForgotPassword.js
import React, { useState } from "react";
import { auth } from "../config";
import { sendPasswordResetEmail } from "firebase/auth";
import "./ForgotPassword.css"; 

const ForgotPassword = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
      setError("");
    } catch (error) {
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <input
        className="password-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button className="reset-button" onClick={handleResetPassword}>
        Reset Password
      </button>
      <button className="reset-button" onClick={() => setState("Login")}>
        Login
      </button>
    </div>
  );
};

export default ForgotPassword;
