import React, { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!username) {
      newErrors.username = "Username is required.";
      isValid = false;
    }
    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Registration Data Submitted:", {
        username,
        email,
        password,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      alert("Registration Successful!");
    } else {
      console.log("Form submission failed due to validation errors.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          {errors.username && (
            <p style={{ color: "red", fontSize: "12px", margin: "4px 0 0 0" }}>
              {errors.username}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "12px", margin: "4px 0 0 0" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "12px", margin: "4px 0 0 0" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
