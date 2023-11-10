import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function SignUpForm() {
  const initialFormData = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(formData.email)) {
      alert("Invalid email address. Please enter a valid email.");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const sanitizedFormData = {
        firstname: escapeHtml(formData.firstname),
        lastname: escapeHtml(formData.lastname),
        email: escapeHtml(formData.email),
        password: escapeHtml(formData.password)
      };

      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sanitizedFormData)
      });

      if (response.ok) {
        const data = await response.json();
        alert("Signup successful!");
        setFormData(initialFormData);
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during signup. Please try again later.");
    }
  };

  const escapeHtml = (unsafe) => {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <div className="logo-container">
          <img src="/images/mylogo.png" alt="logo" />
        </div>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="button-19" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;