import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AppLogin from "./pages/AppLogin";
import AppRegister from "./pages/AppRegister";
import AppGradebooks from "./pages/AppGradebooks";
import AppTeachers from "./pages/AppTeachers";
import SingleGradebook from "./pages/SingleGradebook";

export default function Router({ setIsAuthenticated }) {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/">
          <AppGradebooks />  {/* Home Page */}
        </PrivateRoute>
        <PrivateRoute exact path="/gradebooks">
          <AppGradebooks />
        </PrivateRoute>
        <PrivateRoute exact path="/gradebooks/:id">
          <SingleGradebook />
        </PrivateRoute>
        <PrivateRoute exact path="/teachers">
          <AppTeachers />
        </PrivateRoute>
        <PublicRoute exact path="/login">
          <AppLogin
            onLogin={() => {
              setIsAuthenticated(true);
            }}
          />
        </PublicRoute>
        <PublicRoute exact path="/register">
          <AppRegister
            onRegister={() => {
              setIsAuthenticated(true);
            }}
          />
        </PublicRoute>
      </Switch>
    </div>
  );
}
