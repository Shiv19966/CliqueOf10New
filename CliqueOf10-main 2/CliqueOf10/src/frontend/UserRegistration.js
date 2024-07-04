// Registration.js
import React, { useState } from "react";
import { auth, firestore } from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Registration.css"; // Import your CSS file for styling

const Registration = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([null, null, null, null, null]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerUser = async () => {
    setError("");
    setSuccess("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: name,
      });

     
      await setDoc(doc(firestore, "users", user.uid), {
        name,
        email,
        interests: interests, 
      });
      
      setSuccess("User registered successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <input
        className="registration-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        className="registration-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="registration-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {/* <input
        className="registration-input"
        type="text"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder="Interests (comma-separated)"
      /> */}
      <button className="registration-button" onClick={registerUser}>
        Register
      </button>
      <button className="login-button" onClick={() => setState("Login")}>
        Login
      </button>
    </div>
  );
};

export default Registration;
