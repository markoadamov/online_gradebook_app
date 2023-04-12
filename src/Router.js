import { Switch } from "react-router-dom";
import React from "react";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AppLogin from "./pages/AppLogin";
import AppRegister from "./pages/AppRegister";
import AppGradebooks from "./pages/AppGradebooks";
import AppTeachers from "./pages/AppTeachers";
import SingleGradebook from "./pages/SingleGradebook";
import SingleTeacher from "./pages/SingleTeacher";
import AddGradebook from "./pages/AddGradebook";
import EditGradebook from "./pages/EditGradebook";
import { useSelector } from "react-redux";
import { activeUserSelector } from "./store/authentication/selectors";
import AddStudent from "./pages/AddStudent";

export default function Router({setIsAuthenticated}) {

  const activeUser = useSelector(activeUserSelector);

  return (
    <div>
      <Switch>
        <PublicRoute exact path="/login">
          <AppLogin onLogin={() => {setIsAuthenticated(true) }}/>
        </PublicRoute>
        <PublicRoute exact path="/register">
          <AppRegister onRegister={() => {setIsAuthenticated(true) }}/>
        </PublicRoute>
        <PrivateRoute exact path="/">
          <AppGradebooks />  {/* Home Page */}
        </PrivateRoute>
        <PrivateRoute exact path="/gradebooks">
          <AppGradebooks />
        </PrivateRoute>
        <PrivateRoute exact path="/gradebooks/create">
          <AddGradebook />
        </PrivateRoute>
        <PrivateRoute exact path="/gradebooks/:id/edit">
        {activeUser.id && <EditGradebook />}
        </PrivateRoute>
        <PrivateRoute exact path="/gradebooks/:id">
          <SingleGradebook isMyGradebookPage={false}/>
        </PrivateRoute>
        <PrivateRoute exact path="/my-gradebook">
        {activeUser.id && <SingleGradebook isMyGradebookPage={true}/>}
        </PrivateRoute>
        <PrivateRoute exact path="/teachers/:id">
          <SingleTeacher />
        </PrivateRoute>
        <PrivateRoute exact path="/teachers">
          <AppTeachers />
        </PrivateRoute>
        <PrivateRoute exact path="/gradebooks/:id/students/create">
        {activeUser.id && <AddStudent />}
        </PrivateRoute>
      </Switch>
    </div>
  );
}
