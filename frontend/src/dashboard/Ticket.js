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
  renderTickets() {
    let tickets = []
    this.props.tickets.forEach(function(ticket, i) {
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

    })

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
