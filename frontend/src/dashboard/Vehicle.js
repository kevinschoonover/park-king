import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import VehicleCard from './VehicleCard';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  tableContainer: {
    height: '100%',
  },
});

class Vehicle extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography variant="h3" gutterBottom component="h2">
          Vehicles
        </Typography>

        <Grid container spacing={32}>
          <VehicleCard />
          <VehicleCard />
          <VehicleCard />
          <VehicleCard />
          <VehicleCard />
        </Grid>
        <Fab color="primary" aria-label="Add" className={classes.fab}
             onClick={ () => this.props.onForm()}>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}

Vehicle.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Vehicle);
