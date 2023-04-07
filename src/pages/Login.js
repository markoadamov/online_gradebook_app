import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../services/AuthService";

export default function AppLogin({ onLogin }) {
  const history = useHistory();
  let defaultState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(defaultState);

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalidCredentials(false);

    try {
      await authService.login(credentials);
      onLogin();
      history.push("/");
      console.log("logged in successfully");
    } catch (e) {
      console.log("Error:", e);
      setInvalidCredentials(true);
      alert("invalid credentials");
    }
  }

  return (
    <div className="AppLogin">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          placeholder="Email"
          type="text"
          value={credentials.email}
          onChange={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
          minLength="2"
          required
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          value={credentials.password}
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
          minLength="2"
          required
        />
        {invalidCredentials && (
          <small style={{ color: "red" }}><br />Invalid credentials</small>
        )}
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}
