import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

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

  render() {
    const { classes } = this.props

    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography variant="h3" gutterBottom component="h2">
          Reservations
        </Typography>

        <Grid container spacing={16}>
          <VehiclePaper color />
          <VehiclePaper color />
          <VehiclePaper color />
          <VehiclePaper color />
          <VehiclePaper color />
        </Grid>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={() => this.props.onForm()}
        >
          <AddIcon />
        </Fab>
      </div>
    )
  }
}

Reservation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Reservation);
