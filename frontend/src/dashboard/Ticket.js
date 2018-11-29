import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

import VehiclePaper from './VehiclePaper';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  tableContainer: {
    height: '100%',
  },
});

class Ticket extends React.Component {
  state = {
    tickets: []
  }

  componentDidMount() {
    const tickets = [
      {
        device_id: 1,
        vehicle_id: 1,
        lot_id: 1,
        time: "October 25th 2016",
        vehicle: {
          id: 1,
          user_id: 1,
          type_id: 1,
          state: "TX",
          license: "123456",
          make: "Tesla",
          model: "3",
          year: "2018"
        },
        lot: {
          name: "A",
        }
      }
    ]

    this.setState({tickets});
  }

  renderTickets() {
    let tickets = []
    for (let i=0; i < this.state.tickets.length; i++) {
      const ticket = this.state.tickets[i]
      tickets.push(
        <VehiclePaper
          key={i}
          make={ticket.vehicle.make}
          model={ticket.vehicle.model}
          license={ticket.vehicle.license}
          time={ticket.time}
          lot={ticket.lot.name}
        />
      );
    }

    return tickets
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography variant="h3" gutterBottom component="h2">
          Tickets
        </Typography>

        <Grid container spacing={16}>
          {this.renderTickets()}
        </Grid>
      </div>
    )
  }
}

Ticket.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Ticket);
