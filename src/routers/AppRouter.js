import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { authTokenChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CampaignScreen } from "../components/campaigns/CampaignScreen";
import { HomeScreen } from "../components/home/HomeScreen";
import { PrivateRoute } from "./PrivateRouter";
import { PublicRoute } from "./PublicRouter";
import { createBrowserHistory } from 'history';


export const history = createBrowserHistory();
export const AppRouter = () => {
  const {checkingToken, uid} = useSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authTokenChecking())
  }, [dispatch])

if(checkingToken){
  //TODO a -Loading page
  return(
    <h1>Espere...</h1>
  )
}


  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute 
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!uid}

          />     
          <PrivateRoute 
            exact
            path="/home"
            component={HomeScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/campañas"
            component={CampaignScreen}
            isAuthenticated={!!uid}
          />
          <Redirect to="/home" />   
        </Switch>
      </div>
    </Router>
  );
};
