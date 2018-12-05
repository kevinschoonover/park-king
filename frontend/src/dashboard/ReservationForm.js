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

import axios from 'axios';
import moment from 'moment';

import { auth } from '../auth';


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
    start_time: moment().add(1, 'hours'),
    end_time: moment().add(2, 'hours'),
    lot_id: 1,
    vehicle_id: 1
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
    const url = process.env.REACT_APP_API + `/reservations/`;
    axios.post(url, {...this.state})
      .then((response) => {
        this.props.onSubmit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderVehicles() {
    let items = []
    const vehicles = this.props.vehicles
    for(let i=0; i < vehicles.length; i++)
    {
      const vehicle = vehicles[i]
      items.push(
        <MenuItem key={i} value={ vehicle.id }>{ vehicle.make } { vehicle.model } ({vehicle.license})</MenuItem>
      )
    }

    return items
  }

  renderLots() {
    let items = []
    const lots = this.props.lots
    for(let i=0; i < lots.length; i++)
    {
      const lot_id = lots[i]
      items.push(
        <MenuItem key={i} value={ lot_id.id }>{ lot_id.name }</MenuItem>
      )
    }

    return items
  }

  render() {
    const { classes } = this.props;
    const { start_time, end_time } = this.state;

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
                value={start_time}
                className={classes.picker}
                disablePast
                onChange={this.handleDateChange('start_time')}
                label="Start Time"
                showTodayButton
              />
              <DateTimePicker
                value={end_time}
                className={classes.picker}
                disablePast
                onChange={this.handleDateChange('end_time')}
                label="End Time"
                showTodayButton
              />
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl} margin="normal">
                <InputLabel shrink htmlFor="lot_id-label">
                  lot_id
                </InputLabel>
                <Select
                  value={this.state.lot_id}
                  onChange={this.handleChange('lot_id')}
                  displayEmpty
                  name="lot_id"
                  className={classes.selectEmpty}
                >
                  { this.renderLots() }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} margin="normal">
                <InputLabel shrink htmlFor="vehicle_id-label">
                  vehicle_id
                </InputLabel>
                <Select
                  value={this.state.vehicle_id}
                  onChange={this.handleChange('vehicle_id')}
                  displayEmpty
                  name="vehicle_id"
                  className={classes.selectEmpty}
                >
                  { this.renderVehicles() }
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
