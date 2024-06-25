import React from "react";
import NavBar from "./modules/NavBar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import My from "./pages/My.js";
import Signup from "./pages/Signup.jsx";

import "../utilities.css";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signup />} />
        <Route
          path="*"
          element={
            <>
              <NavBar />
              <div className="App-container">
                <Routes>
                  <Route path="/file" element={<Feed />} />
                  <Route path="/" element={<Profile />} />
                  <Route path="/my" element={<My />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
