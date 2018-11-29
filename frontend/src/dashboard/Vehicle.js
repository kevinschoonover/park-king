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
  state = {vehicles: []};

  componentDidMount() {
    //axios.get("")
    //  .then(res => {
    //    const vehicles = res.data;
    //    this.setState({ vehicles });
    //  })
    const vehicles = [
      {
        id: 1,
        state: "TX",
        license: "123456",
        make: "Tesla",
        model: "3",
        year: "2018"
      },
      {
        id: 1,
        state: "TX",
        license: "123456",
        make: "Tesla",
        model: "3",
        year: "2018"
      },
      {
        id: 1,
        state: "TX",
        license: "123456",
        make: "Tesla",
        model: "3",
        year: "2018"
      }
    ]
    this.setState({vehicles});
  }


  renderVehicles() {
    const vehicle_state = this.state.vehicles
    let vehicles = []
    for (var i=0; i < vehicle_state.length; i++) {
      const vehicle = vehicle_state[i]
      vehicles.push(
        <VehicleCard
          key={i}
          make={vehicle.make}
          model={vehicle.model}
          license={vehicle.license}
        />
      )
    }

    return vehicles
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography variant="h3" gutterBottom component="h2">
          Vehicles
        </Typography>

        <Grid container spacing={32}>
          {this.renderVehicles()}
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
