import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
// import { Toolbar, ToolbarGroup, ToolbarTitle } from '@material-ui/core/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable';

import DesktopNav from './Header/DesktopNav';

class Header extends React.Component {
  static propTypes = {
    userLoggedIn: PropTypes.bool
  };

  render() {
    const appBar = this.props.muiTheme.appBar;
    const { userLoggedIn = false } = this.props;

    return (
      <Toolbar
        style={{
          backgroundColor: appBar.color
        }}
      >
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle
            text='Time Tracking System'
            style={{
              color: appBar.textColor,
              marginLeft: 40
            }}
          />
        </ToolbarGroup>
        <DesktopNav userLoggedIn={userLoggedIn} />
      </Toolbar>
    );
  }
}

export default muiThemeable()(Header);
