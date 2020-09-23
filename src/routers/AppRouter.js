import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CampaignScreen } from "../components/campaigns/CampaignScreen";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/campañas">
            <CampaignScreen />
          </Route>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
