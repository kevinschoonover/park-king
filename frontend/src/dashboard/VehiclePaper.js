import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

import moment from "moment";

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
  tableContainer: {
    height: '100%',
  },
  subheading: {
    fontWeight: 'lighter',
    fontSize: '28px',
  },
  date: {
    fontSize: '24px',
  },
});


const VehiclePaper = (props) => {
  const { classes } = props
  const colors = [
    red[500],
    orange[500],
    green[500],
  ]

  let div_color = undefined;
  if (props.color) {
    div_color = colors[Math.floor(Math.random()*colors.length)];
  }

  const time = moment(props.time)
  const day = time.format("MMMM Do YYYY");
  const hour = time.format("h:mm:ss a");

  return (
    <Grid item xs={12}>
      <Paper className={classes.container} style={{backgroundColor: div_color}}>
        <Grid container direction="row" spacing={16}>
          <Grid item container xs={2} alignItems="center" justify="center">
            <Typography variant="h4">
              {props.make} {props.model}
            </Typography>
          </Grid>
          <Grid item container xs={2} alignItems="center" justify="center">
            <Typography className={classes.subheading} variant="subheading">
              {props.license}
            </Typography>
          </Grid>
          <Grid item container xs={6} alignItems="center" justify="center" direction="column">
            <Typography className={classes.date} variant="body1">
              {day}
            </Typography>
            <Typography className={classes.date} variant="body1">
              {hour}
            </Typography>
          </Grid>
          <Grid item container xs={2} alignItems="center" justify="center">
            <Typography variant="h4">
              Lot {props.lot}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default withStyles(styles)(VehiclePaper);
