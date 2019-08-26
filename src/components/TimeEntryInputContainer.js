import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toAmPm, fromAmPM, fromAmPmToDate } from '../utils/time';
import {
  changeText,
  changeStartTime,
  stop,
  start,
  pull,
  remove
} from '../actions/timeEntryInput';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import TimeEntryInput from '../components/TimeEntryInput';

export class TimeEntryInputContainer extends Component {
  static propTypes = {
    now: PropTypes.number,
    startTime: PropTypes.number,
    text: PropTypes.string,
    uid: PropTypes.string,
    onChangeText: PropTypes.func,
    onChangeStartTime: PropTypes.func,
    onStop: PropTypes.func,
    onStart: PropTypes.func,
    onPull: PropTypes.func,
    onRemove: PropTypes.func,
    isFetching: PropTypes.bool
  };

  static defaultProps = {
    text: '',
    isFetching: false
  };

  constructor(props) {
    super(props);

    const startTime = props.startTime ? new Date(props.startTime) : null;
    const startTimeAmPm = props.startTime
      ? toAmPm(new Date(props.startTime))
      : null;

    this.state = {
      startTime,
      startTimeAmPm,
      dialogOpen: false
    };
  }

  componentWillMount() {
    this.props.pull(this.props.uid);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.startTime) {
      const startTime = new Date(nextProps.startTime);
      const startTimeAmPm = toAmPm(startTime);

      this.setState({
        startTime,
        startTimeAmPm
      });
    }
  };

  handleOpenDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };

  handleChangeText = text => {
    this.props.changeText(this.props.uid, text);
  };

  //validate input and save
  handleUpdateStartTimeAmPm = e => {
    const value = e.target.value;

    const startTimeAmPm = fromAmPM(e.target.value);
    if (startTimeAmPm) {
      const now = this.props.now ? new Date(this.props.now) : new Date();
      const newStartTimeInDate = fromAmPmToDate(value, now);
      const newStartTimeAmPm = toAmPm(newStartTimeInDate);
      this.setState({
        startTime: newStartTimeInDate,
        startTimeAmPm: newStartTimeAmPm
      });
      this.props.changeStartTime(this.props.uid, newStartTimeInDate);
    }
    //if invalid input then revert to current value
    else {
      this.setState({
        startTimeAmPm: toAmPm(this.state.startTime)
      });
    }
  };

  handleChangeStartTimeAmPm = e => {
    this.setState({
      startTimeAmPm: e.target.value
    });
  };

  handleStart = text => {
    const now = this.props.now ? new Date(this.props.now) : new Date();
    // console.log('Value of this moment:', now);
    this.props.start(this.props.uid, text, now);
  };

  handleStop = () => {
    this.props.stop(this.props.uid, this.props.text, this.props.startTime);
  };

  handleRemove = () => {
    this.props.remove(this.props.uid);
  };

  render() {
    return (
      <div>
        <TimeEntryInput
          text={this.props.text}
          startTime={this.props.startTime}
          isFetching={this.props.isFetching}
          onChangeText={this.handleChangeText}
          onOpenDialog={this.handleOpenDialog}
          onStop={this.handleStop}
          onStart={this.handleStart}
          onRemove={this.handleRemove}
          removedSuccess={this.props.removedSuccess}
        />
        <Dialog
          open={this.state.dialogOpen}
          onRequestClose={this.handleCloseDialog}
          contentStyle={{ width: 250 }}
        >
          Start{' '}
          <TextField
            value={this.state.startTimeAmPm}
            style={{ marginLeft: 30, width: 80 }}
            onChange={this.handleChangeStartTimeAmPm}
            onBlur={this.handleUpdateStartTimeAmPm}
            name='startTimeAmPm'
          />
          <br />
          End{' '}
          <span style={{ marginLeft: 35, width: 80 }}>
            {toAmPm(new Date())}
          </span>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  startTime: state.timeEntryInput ? state.timeEntryInput.startTime : null,
  text: state.timeEntryInput ? state.timeEntryInput.text : null,
  uid: state.auth.user ? state.auth.user.uid : null,
  isFetching: state.timeEntryInput.isFetching,
  removedSuccess: state.timeEntryInput.removedSuccess
});

export default connect(
  mapStateToProps,
  { changeText, changeStartTime, stop, start, pull, remove }
)(TimeEntryInputContainer);
