import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AppLogin from "./components/AppLogin";
import AppRegister from "./components/AppRegister";
import AppGradebooks from "./pages/AppGradebooks";

export default function Router({ setIsAuthenticated }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/gradebooks" />
        </Route>
        <PrivateRoute exact path="/gradebooks">
          <AppGradebooks />
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
