import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MapIcon from '@material-ui/icons/Map';

import VehiclePaper from './VehiclePaper';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  tableContainer: {
    height: '100%',
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class Reservation extends React.Component {
  state = {
    reservations: [],
    open: false,
  };

  componentDidMount() {
    const reservations = [
      {
        vehicle_id: 1,
        lot_id: 1,
        start_time: "October 25th 2018",
        end_time: "October 26th 2018",
        vehicle: {
          state: "TX",
          license: "123456",
          make: "Tesla",
          model: "3",
          year: "2018",
        },
        lot: {
          name: "A"
        }
      },
    ]

    this.setState({ reservations })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };


  renderReservations() {
    let reservations = []
    for(let i=0; i < this.state.reservations.length; i++) {
      const reservation = this.state.reservations[i]
      reservations.push(
        <VehiclePaper
          color
          key={i}
          make={reservation.vehicle.make}
          model={reservation.vehicle.model}
          year={reservation.vehicle.year}
          lot={reservation.lot.name}
          license={reservation.vehicle.license}
          time={reservation.start_time}
        />
      )
    }

    return reservations
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography variant="h3" gutterBottom component="h2">
          Reservations
        </Typography>

        <Grid container spacing={16}>
          {this.renderReservations()}
        </Grid>
        <div className={classes.fab}>
          <SpeedDial
            ariaLabel="SpeedDial example"
            icon={<SpeedDialIcon />}
            onBlur={this.handleClose}
            onClick={this.handleClick}
            onClose={this.handleClose}
            onFocus={this.handleOpen}
            onMouseEnter={this.handleOpen}
            onMouseLeave={this.handleClose}
            open={this.state.open}
            direction="up"
          >
            <SpeedDialAction
              icon={<AddIcon />}
              tooltipTitle='Add'
              onClick={this.props.onForm}
            />
            <SpeedDialAction
              icon={<MapIcon />}
              tooltipTitle='Map'
              ButtonProps={{
                component: Link,
                to: "/map/"
              }}
            />
          </SpeedDial>
        </div>
      </div>
    )
  }
}

Reservation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Reservation);
