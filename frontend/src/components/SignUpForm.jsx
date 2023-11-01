import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginForm.css";

function SignUpForm() {
  const initialFormData = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sanitize user input (escape HTML entities) before sending it to the server
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
        alert("Signup successful! You can customize this alert with server response.");
        setFormData(initialFormData);

        // Navigate to the login page after successful signup
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during signup. Please try again later.");
    }
  };

  // Function to escape HTML entities
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
        <button className="button-19" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
