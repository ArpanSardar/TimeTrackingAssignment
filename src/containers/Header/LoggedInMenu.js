import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signout } from '../../actions/signout';

import MenuItem from 'material-ui/MenuItem';

import muiThemeable from 'material-ui/styles/muiThemeable';

class LoggedInMenu extends Component {
  render() {
    return (
      <MenuItem
        primaryText='Sign out'
        style={{ marginLeft: 10, color: '#ffffff' }}
        onClick={this.props.signout}
      />
    );
  }
}

LoggedInMenu.prototypes = {
  signout: PropTypes.func
};
export default connect(
  null,
  { signout }
)(muiThemeable()(LoggedInMenu));
