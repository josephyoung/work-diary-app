import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './App';
import SignUp from './sign_up';
import RestorePassword from './RestorePassword';

const AppRoute = () => (
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/signup' component={SignUp} />
      <Route path='/restore_password' component={RestorePassword} />
    </div>
  </Router>
);

export default AppRoute;
