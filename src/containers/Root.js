import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import Report from '../components/Report';
import TimeTracker from '../components/TimeTracker';
import CheckAuth from './CheckAuth';
import Login from './auth/Login';
import Register from './auth/Register';

const Root = ({ store, history, requireAuth }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={TimeTracker} onEnter={requireAuth} />
        <Route path='/check-auth' component={CheckAuth} />
        <Route path='/tracker' component={TimeTracker} onEnter={requireAuth} />
        <Route path='/report' component={Report} onEnter={requireAuth} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired
};

export default Root;
