import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Send from "@material-ui/icons/Send";

import { DateTimePicker } from 'material-ui-pickers';


const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100px",
  },
  button: {
    margin: theme.spacing.unit,
  },
  picker: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class ReservationForm extends React.Component {
  state = {
    startDate: new Date('2018-01-01T18:54'),
    endDate: new Date('2018-01-01T18:54'),
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChange = id => date => {
    this.setState({
      [id]: date
    });
  };

  handleSubmit = () => {
    this.props.onSubmit()
  };

  render() {
    const { classes } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography variant="h3" gutterBottom component="h2">
          Add Reservation
        </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={16} direction="column">
            <Grid item>
              <DateTimePicker
                value={startDate}
                className={classes.picker}
                disablePast
                onChange={this.handleDateChange('startDate')}
                label="Start Time"
                showTodayButton
              />
              <DateTimePicker
                value={endDate}
                className={classes.picker}
                disablePast
                onChange={this.handleDateChange('endDate')}
                label="End Time"
                showTodayButton
              />
            </Grid>
            <Grid item>
              <TextField
                id="state"
                label="State"
                className={classes.textField}
                value={this.state.state}
                onChange={this.handleChange('state')}
                margin="normal"
              />
              <TextField
                id="license"
                label="License"
                className={classes.textField}
                value={this.state.license}
                onChange={this.handleChange('license')}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.handleSubmit()}
              >
                Send
                <Send className={classes.rightIcon} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ReservationForm);
