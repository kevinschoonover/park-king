import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import Dashboard from './dashboard/Dashboard';
import SignIn from './sign-in/SignIn'
import FullMap from './map/Map'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <div style={{height: '100%'}}>
      <Route exact path="/" component={Dashboard} />
      <Route path="/login/" component={SignIn} />
      <Route path="/map/" component={FullMap} />

    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
