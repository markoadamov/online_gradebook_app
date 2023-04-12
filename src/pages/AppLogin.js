import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { performLogin, performErrorReset } from "../store/authentication/slice";
import { errorsSelector } from "../store/authentication/selectors";

export default function AppLogin({ onLogin }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const errors = useSelector(errorsSelector);

  let defaultState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(defaultState);

  useEffect(() => {
    dispatch(performErrorReset());
  }, []);

  const handleRedirect = () => {
    history.push("/");
    onLogin();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(performLogin({data: credentials, redirect: handleRedirect}))
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
        {errors.message && (
          <small style={{ color: "red" }}><br />{errors.message}</small>
        )}
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}
