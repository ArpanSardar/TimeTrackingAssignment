import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { MuiThemeProvider } from '@material-ui/core/styles';

import '../App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header userLoggedIn={this.props.auth.userLoggedIn} />
          <div className='content'>
            <div className='row'>
              <div
                className='col-xs-12
                col-sm-offset-2 col-sm-8
                col-md-offset-2 col-md-8
                col-lg-offset-2 col-lg-8
                '
              >
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(App);
