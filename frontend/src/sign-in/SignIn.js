import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

import axios from "axios";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Snackbar from '@material-ui/core/Snackbar';


import { auth } from '../auth'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  split: {
    marginTop: theme.spacing.unit * 3,
  },

});

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    open: false,
    message: "",
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSignIn() {
    const email = this.state.email
    const password = this.state.password

    axios.post(process.env.REACT_APP_API + "/users/auth/", {email, password})
    .then((response) => {
      auth.authenticate(response.data);
      this.setState({state: this.state})
    })
    .catch((error) => {
      if (error.response.status === 400) {
        this.setState({ open: true, message: "User Not Found" });
      }
      else {
        this.setState({ open: true, message: "Internal Server Error" });
      }
    })
  }

  onSignUp() {
    const email = this.state.email
    const password = this.state.password

    axios.post(process.env.REACT_APP_API + "/users/", {email, password})
    .then((response) => {
      auth.authenticate(response.data);
      this.setState({state: this.state})
    })
    .catch((error) => {
      if (error.response.status === 500) {
        this.setState({ open: true, message: "Internal Server Error" });
      }
    })
  }

  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (auth.isAuthenticated()) {
      return (
        <Redirect to={ from } />
      )
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={this.state.message}
        />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange('email')}
                value={this.state.email}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange('password')}
                value={this.state.password}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.onSignIn()}
            >
              Sign in
            </Button>
            <Typography variant="subtitle1" className={classes.split} align="center">
              or
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => this.onSignUp()}
            >
              Sign Up
           </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
