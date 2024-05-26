import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostAuthHeader from './Header/PostAuthHeader';
import { PrivateRoute } from './_components';
import { LoginPage } from './LoginPage';
import Header from "./Header/Header";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import "./assets/fontello/css/fontello.css";
import AppHomeNavbar from "./AppHomeNavbar";
import AppNavbar from "./AppNavbar";
import HomeNavigationTools from "./HomeNavigationTools";
import NavigationTools from "./NavigationTools";
import { withRouter } from "react-router-dom";
import Registration from './Header/Registration';
import { SignUpPage } from './SignUpPage';
import UserRegistrationList from './UserRegistrationList';
import CheckRegistrationValidity from './Header/CheckRegistrationValidity';

library.add(faEnvelope, faKey);

class App extends Component {
  render() {
    return (
      <div className="main-box">
        <Header />
        <Switch>
          <PrivateRoute path="/registration" exact={true} component={Registration} />
          <PrivateRoute path="/" exact={true} component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute path="/statistics" exact={true} component={UserRegistrationList} />
          <PrivateRoute path="/checkvalid" exact={true} component={CheckRegistrationValidity} />
          
          
          <Route
            path="/postAuthHeader"
            exact={true}
            component={PostAuthHeader}
          />
          <Route path="/header" exact={true} component={Header} />
          <Route path="/appHomeNavbar" exact={true} component={AppHomeNavbar} />
          <Route path="/appNavbar" exact={true} component={AppNavbar} />
          <Route
            path="/homeNavigationTools"
            exact={true}
            component={HomeNavigationTools}
          />

          <Route
            path="/navigationTools"
            exact={true}
            component={NavigationTools}
          />
        
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);