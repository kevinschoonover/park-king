import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './index.css';
import Dashboard from './dashboard/Dashboard';
import SignIn from './sign-in/SignIn'
import FullMap from './map/Map'

import { auth } from "./auth"

import * as serviceWorker from './serviceWorker';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

ReactDOM.render(
  <Router>
    <div style={{height: '100%'}}>
      <PrivateRoute exact path="/" component={Dashboard} />
      <Route path="/login/" component={SignIn} />
      <PrivateRoute path="/map/" component={FullMap} />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
