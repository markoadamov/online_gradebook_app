import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/AuthService";

export default function Header({ isAuthenticated, setIsAuthenticated }) {
  async function handleLogout() {
    await authService.logout();
    setIsAuthenticated(false);
  }

  return (
    <nav className="navigation">
      <div>
        {!isAuthenticated && (
          <>
            <label> || </label>
            <Link to="/register">
              <button className="navigationButtons">Register</button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <label> || </label>
            <button className="navigationButtons" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <label> || </label>
            <Link to="/login">
              <button className="navigationButtons">Login</button>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <label> || </label>
            <Link to="/">
              <button className="navigationButtons">Home</button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <label> || </label>
            <Link to="/teachers">
              <button className="navigationButtons">Teachers</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
