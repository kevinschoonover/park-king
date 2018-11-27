import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import purple from '@material-ui/core/colors/purple';

const styles = {
  card: {
    maxWidth: 800,
		minWidth: 400
  },
  media: {
    height: 200,
		backgroundColor: purple[500]
  },
};


const VehicleCard = (props) => {
  const { classes } = props

  return (
    <Grid item>
      <Card className={classes.card}>
        <div
          className={classes.media}
        />
				<CardContent>
          <Typography gutterBottom variant="h4" component="h2" align="center">
						Tesla 3
          </Typography>
          <Typography gutterBottom style={{fontWeight: 'lighter'}} variant="h5" align="center">
						ABCDEF
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default withStyles(styles)(VehicleCard);
