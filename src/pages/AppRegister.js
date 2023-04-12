import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { performRegister, performErrorReset } from "../store/authentication/slice";
import { errorsSelector } from "../store/authentication/selectors";

export default function AppRegister({ onRegister }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image_url: "",
    accepted_terms: "",
  });

  const errors = useSelector(errorsSelector);

  useEffect(() => {
    dispatch(performErrorReset());
  }, []);
  
  const handleRedirect = () => {
    history.push("/");
    onRegister();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(performRegister({data: credentials, redirect: handleRedirect}))
  }

  function handleChange() {
    credentials.accepted_terms?setCredentials({ ...credentials, accepted_terms: "" }):setCredentials({ ...credentials, accepted_terms: true });
  }

  function handleErrorMessages(errors) {
    return (
      <div>
        {errors.map((errorMessage, index) => {
          console.log(errorMessage);
          return (
            <small key={index} style={{ color: "red" }}>
              {errorMessage}
              <br />
            </small>
          );
        })}
      </div>
    );
  }

  return (
    <div className="AppRegister">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          //required
          value={credentials.first_name}
          placeholder="First Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, first_name: target.value })
          }
        />

        {errors.first_name ? handleErrorMessages(errors.first_name):<br/>}

        <input
          //required
          value={credentials.last_name}
          placeholder="Last Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, last_name: target.value })
          }
        />

        {errors.last_name ? handleErrorMessages(errors.last_name):<br/>}

        <input
          //required
          value={credentials.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
          }
        />

        {errors.email ? handleErrorMessages(errors.email):<br/>}

        <input
          //required
          value={credentials.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
        <br />
        <input
          //required
          value={credentials.password_confirmation}
          type="password"
          placeholder="Confirm password"
          onChange={({ target }) =>
            setCredentials({
              ...credentials,
              password_confirmation: target.value,
            })
          }
        />

        {errors.password ? handleErrorMessages(errors.password):<br/>}
        
        <input
          //required
          value={credentials.image_url}
          placeholder="Image URL"
          onChange={({ target }) =>
            setCredentials({ ...credentials, image_url: target.value })
          }
        />

        {errors.image_url ? handleErrorMessages(errors.image_url):<br/>}

        <input
          type="checkbox"
          onChange={handleChange}
          checked={credentials.accepted_terms}
        />
        <label>
          Accepted terms
          <br />
          and conditions
        </label>

        {errors.accepted_terms ? handleErrorMessages(errors.accepted_terms):<br/>}
        
        <button>Register</button>
      </form>
    </div>
  );
}
