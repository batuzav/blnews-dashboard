import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { authTokenChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CampaignScreen } from "../components/campaigns/CampaignScreen";

export const AppRouter = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authTokenChecking())
  }, [dispatch])
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/campañas">
            <CampaignScreen />
          </Route>
          <Route exact path="/login">
            <LoginScreen />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
