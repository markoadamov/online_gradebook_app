import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/AuthService";

export default function Header({ isAuthenticated, setIsAuthenticated }) {
  async function handleLogout() {
    await authService.logout();
    setIsAuthenticated(false);
  }

  return (
    <div>
      <label> || </label>
      {!isAuthenticated && (
        <Link to="/register">
          <button className="navigationButtons">Register</button>
        </Link>
      )}
      {isAuthenticated && (
        <button className="navigationButtons" onClick={handleLogout}>
          Logout
        </button>
      )}
      <label> || </label>
      {!isAuthenticated && (
        <Link to="/login">
          <button className="navigationButtons">Login</button>
        </Link>
      )}
    </div>
  );
}
