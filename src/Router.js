import { Route, Switch, Redirect } from "react-router-dom";
import React from 'react'
import PublicRoute from "./components/PublicRoute";
import AppLogin from "./components/AppLogin";
import AppRegister from "./components/AppRegister";

export default function Router({ setIsAuthenticated }) {
  return (
    <div>
      <Switch>
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
  )
}
