import { withRouter } from 'react-router';
import React, { Component } from 'react';

import { login } from '../../actions/login';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import { Form, Icon, Input, Button, Alert } from 'antd';
import 'antd/dist/antd.css';

const emailRegEx = RegExp(
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      errUserEmail: { status: '', msg: '' },
      errUserPassword: { status: '', msg: '' }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { status, errorMessage } = nextProps.auth;

    if (status === 'success') {
      this.setState({ error: '' });
      const { location } = this.props;

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname);
      } else {
        console.log('Will go to tracker page.');
        this.props.router.replace('/tracker');
      }
    } else {
      this.setState({ error: errorMessage });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  handleChange = e => {
    let target = e.target;
    let value = target.value;

    let name = target.name;

    switch (name) {
      case 'email':
        if (!emailRegEx.test(value)) {
          this.setState({
            errUserEmail: {
              status: 'error',
              msg: 'Please enter your email in proper format.'
            }
          });
        } else {
          this.setState({
            errUserEmail: { status: '', msg: '' }
          });
        }
        break;
      case 'password':
        if (!value) {
          this.setState({
            errUserPassword: {
              status: 'error',
              msg: 'Please enter your password.'
            }
          });
        } else {
          this.setState({
            errUserPassword: { status: '', msg: '' }
          });
        }
        break;
      default:
        break;
    }

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Paper style={{ padding: 50, marginTop: 30 }}>
        {this.state.error ? (
          <Alert message={this.state.error} type='error' showIcon />
        ) : null}
        <Form layout='vertical'>
          <Form.Item
            label={<span>Your Email</span>}
            validateStatus={this.state.errUserEmail.status}
            help={this.state.errUserEmail.msg}
          >
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='example: arpansardar@email.com'
              value={this.state.email}
              onChange={this.handleChange}
              name='email'
            />
          </Form.Item>
          <Form.Item
            label={<span>Your Password</span>}
            validateStatus={this.state.errUserPassword.status}
            help={this.state.errUserPassword.msg}
          >
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='example: yourpassword0111'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
              name='password'
            />
          </Form.Item>

          <Button
            type='primary'
            onClick={this.handleSubmit}
            block
            loading={this.props.auth.isFetching}
          >
            Login
          </Button>
        </Form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(withRouter(Login));
