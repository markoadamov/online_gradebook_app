import "./App.css";
import Router from "./Router";
import { useState } from "react";
import Page from "./layout/Page";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div className="App">
      <Page
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      >
        <Router setIsAuthenticated={setIsAuthenticated} />
      </Page>
    </div>
  );
}

export default App;
