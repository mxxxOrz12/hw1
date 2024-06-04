import React from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import My from "./pages/My.js";

import "../utilities.css";
import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="App-container">
        <Router>
          <Feed path="/file" />
          <Profile path="/" />
          <My path="/my" />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
