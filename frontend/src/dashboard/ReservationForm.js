import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

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
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ReservationForm extends React.Component {
  state = {
    startDate: new Date('2018-01-01T18:54'),
    endDate: new Date('2018-01-01T18:54'),
    lot: "Lot A",
    vehicle: "Tesla 3"
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
              <FormControl className={classes.formControl} margin="normal">
                <InputLabel shrink htmlFor="lot-label">
                  Lot
                </InputLabel>
                <Select
                  value={this.state.lot}
                  onChange={this.handleChange('lot')}
                  input={<Input name="lot" id="lot-label" />}
                  displayEmpty
                  name="lot"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} margin="normal">
                <InputLabel shrink htmlFor="vehicle-label">
                  Vehicle
                </InputLabel>
                <Select
                  value={this.state.vehicle}
                  onChange={this.handleChange('vehicle')}
                  input={<Input name="vehicle" id="vehicle-label" />}
                  displayEmpty
                  name="vehicle"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
