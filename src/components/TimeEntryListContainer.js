import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchList } from '../actions/timeEntries';
import { groupByDay } from '../utils/timeEntries';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import TimeEntryListItemContainer from './TimeEntryListItemContainer';

export class TimeEntryListItemsByDay extends Component {
  static propTypes = {
    entries: PropTypes.array
  };
  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan='4'>{this.props.date}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.entries.map(timeEntry => {
            return (
              <TimeEntryListItemContainer
                key={timeEntry.key}
                text={timeEntry.text}
                id={timeEntry.key}
                startTime={timeEntry.startTime}
                endTime={timeEntry.endTime}
              />
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export class TimeEntryListContainer extends Component {
  static propTypes = {
    onFetchList: PropTypes.func,
    entries: PropTypes.object,
    removedSuccess: PropTypes.bool
  };

  static defaultProps = {
    entries: {},
    removedSuccess: false
  };

  // componentDidUpdate(prevProps) {
  //   console.log('In did update uid:', this.props.uid);
  //   if (prevProps.entries !== this.props.entries) {
  //     this.setState({ entries: this.props.entries });
  //   }
  // }
  componentWillMount() {
    console.log('In will mount uid:', this.props.uid);
    this.props.fetchList(this.props.uid);
  }

  // componentDidMount() {
  //   console.log('In did mount uid:', this.props.uid);
  //   this.props.fetchList(this.props.uid);
  // }

  render() {
    const entriesByDay = groupByDay(this.props.entries);
    return (
      <div>
        {entriesByDay.map(e => (
          <TimeEntryListItemsByDay
            key={e.date}
            date={e.date}
            entries={e.entries}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.timeEntries ? state.timeEntries.entries : {},
  uid: state.auth.user ? state.auth.user.uid : null,
  isFetching: state.timeEntries ? state.timeEntries.isFetching : null,
  removedSuccess: state.timeEntries ? state.timeEntries.removedSuccessse : false
});

export default connect(
  mapStateToProps,
  { fetchList }
)(TimeEntryListContainer);
