import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate(); 

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    const requestBody = {
      email,
      password
    };

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('role', responseData.role);

        navigate("/dashboard");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setState({
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <div className="logo-container">
          <img src="/images/mylogo.png" alt="logo" />
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="/forgot-password">Forgot your password?</a>
        <button className="button-19">Sign In</button>
      </form>
    </div>
  );
}

export default LoginForm;
