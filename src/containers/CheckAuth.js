// Display waiting screen during checking user's logged in  status with server

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';
import { isUserLoggedIn } from '../actions/isUserLoggedIn';

import LinearProgress from 'material-ui/LinearProgress';

export class CheckAuth extends Component {
  componentWillMount() {
    this.props.isUserLoggedIn();
  }

  componentWillReceiveProps = nextProps => {
    const { userLoggedIn, location, router, isFetching } = nextProps;
    if (isFetching) {
      return;
    }
    if (userLoggedIn) {
      if (location.state && location.state.nextPathname) {
        router.replace(location.state.nextPathname);
      } else {
        router.replace('/tracker');
      }
    } else {
      history.push('/login');
    }
  };

  render() {
    return (
      <div
        style={{
          marginTop: '30vh',
          textAlign: 'center'
        }}
      >
        Checking authentication status. Please wait !! <br />
        <br />
        <LinearProgress mode='indeterminate' />
      </div>
    );
  }
}

CheckAuth.propTypes = {
  isUserLoggedIn: PropTypes.func,
  userLoggedIn: PropTypes.bool,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => ({
  userLoggedIn: state.auth.userLoggedIn,
  isFetching: state.auth.isFetching
});

export default connect(
  mapStateToProps,
  { isUserLoggedIn }
)(CheckAuth);
