import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/AuthService";
import { useDispatch } from "react-redux";
import { performLogout } from "../store/authentication/slice";

export default function Header({ isAuthenticated, setIsAuthenticated }) {

  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(performLogout(setIsAuthenticated))
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
              <button className="navigationButtons">Gradebooks</button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <label> || </label>
            <Link to="/my-gradebook">
              <button className="navigationButtons">My Gradebook</button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <label> || </label>
            <Link to="/gradebooks/create">
              <button className="navigationButtons">Add Gradebook</button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <label> || </label>
            <Link to="/teachers">
              <button className="navigationButtons">All Professors</button>
            </Link>
          </>
        )}
      </div>
      <div>Online Gradebook App ||</div>
    </nav>
  );
}
