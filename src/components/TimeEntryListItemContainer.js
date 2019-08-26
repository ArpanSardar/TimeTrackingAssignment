import React, { Component } from 'react';
import { connect } from 'react-redux';

import { remove } from '../actions/timeEntries';

import TimeEntryListItem from './TimeEntryListItem';

class TimeEntryListItemContainer extends Component {
  render() {
    return <TimeEntryListItem {...this.props} />;
  }
}

const mapStateToProps = state => ({
  uid: state.auth.user.uid
});

export default connect(
  mapStateToProps,
  { remove }
)(TimeEntryListItemContainer);
