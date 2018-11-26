import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

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
    fontSize: '24px',
  },
  date: {
    fontSize: '24px',
  }
});


const TicketEntry = (props) => {
  const { classes } = props

  return (
    <Grid item xs={12}>
      <Paper className={classes.container}>
        <Grid container direction="row" spacing={16}>
          <Grid item container xs={2} alignItems="center" justify="center">
            <Typography variant="h4">
              Tesla 3
            </Typography>
          </Grid>
          <Grid item container xs={2} alignItems="center" justify="center">
            <Typography className={classes.subheading} variant="subheading">
              FK8432
            </Typography>
          </Grid>
          <Grid item container xs={6} alignItems="center" justify="center" direction="column">
            <Typography className={classes.date} variant="body1">
              October 16th, 2018
            </Typography>
            <Typography className={classes.date} variant="body1">
              16:40
            </Typography>
          </Grid>
          <Grid item container xs={2} alignItems="center" justify="center">
            <Typography variant="h4">
              Lot A
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default withStyles(styles)(TicketEntry);
