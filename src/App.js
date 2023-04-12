import "./App.css";
import Router from "./Router";
import { useState, useEffect } from "react";
import Page from "./layout/Page";
import { useDispatch, useSelector } from "react-redux";
import { performSetActiveUser } from "./store/authentication/slice";
import { activeUserSelector } from "./store/authentication/selectors";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const dispatch = useDispatch();
  const activeUser = useSelector(activeUserSelector);

  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      dispatch(performSetActiveUser());
    }
  }, []);

  return (
    <div className="App">
      <Page
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      >
        <div className="ActiveUserDiv">
          {isAuthenticated && (
            <label>
              Active User/Teacher:{" "}
              <label className="greenLabel">
                {activeUser.first_name} {activeUser.last_name}
              </label>
            </label>
          )}
        </div>
        <Router setIsAuthenticated={setIsAuthenticated} />
      </Page>
    </div>
  );
}

export default App;
