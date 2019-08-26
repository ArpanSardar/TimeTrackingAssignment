import React, { Component } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import ReportFilter from './Report/Filter';
import ReportEntryList from './Report/EntryList';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  padding: 10,
  margin: 10,
  marginBottom: 30
};

export class Report extends Component {
  render() {
    const hasData =
      this.props.entries && Object.keys(this.props.entries).length > 0;
    return (
      <div className='report'>
        <Paper style={style} zDepth={1}>
          <ReportFilter />
        </Paper>
        {this.props.isFetching ? (
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <RefreshIndicator
              size={40}
              left={10}
              top={0}
              status='loading'
              style={{ display: 'inline-block', position: 'relative' }}
            />
          </div>
        ) : hasData ? (
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <ReportEntryList entries={this.props.entries} />
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No time entry found</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.report.entries,
  isFetching: state.report.isFetching
});

export default connect(
  mapStateToProps,
  null
)(Report);
