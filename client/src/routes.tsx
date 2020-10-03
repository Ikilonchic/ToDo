import React, { Component } from 'react';
import { Switch , Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

import AuthAPI from './context/auth.api';

interface IProps {
  component: Component
}

const RouteRegistration = ({ component: Component, ...rest }: {component: any, [x: string]: any}) => {
  const authAPI = React.useContext(AuthAPI);
  return (
    <Route 
      {...rest} 
      render={(props) => (!authAPI.auth ? <Component {...props} exact /> : <Redirect to="/" />)}
    />
  )
};

const RouteProtected = ({ component: Component, ...rest }: {component: any, [x: string]: any}) => {
  const authAPI = React.useContext(AuthAPI);
  return (
    <Route 
      {...rest} 
      render={(props) => (authAPI.auth ? <Component {...props} exact /> : <Redirect to="/signin" />)}
    />
  )
};

const Routes: React.FC = () => {
  const authAPI = React.useContext(AuthAPI);

  return (
    <Switch>
      <RouteRegistration path="/signin" component={SignInPage} />
      <RouteRegistration path="/signup" component={SignUpPage} />
      <RouteProtected path="/" component={HomePage} />
    </Switch>
  )
};


export default Routes;