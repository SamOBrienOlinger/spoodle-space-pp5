import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}>
      <CurrentUserProvider>
        <ProfileDataProvider>
           <App />
        </ProfileDataProvider>
      </CurrentUserProvider>
    </Router>,
  document.getElementById("root")
);
