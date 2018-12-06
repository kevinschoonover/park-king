import React from 'react';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import Send from "@material-ui/icons/Send";

import { auth } from "../auth";


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
  }
});

class VehicleForm extends React.Component {
  state = {
    make: 'Tesla',
    model: 'X',
    year: '2018',
    state: 'Texas',
    license: 'tesla3',
  };

  renderVehicleTypes() {
    let items = []
    const types = this.props.types
    for(let i=0; i < types.length; i++)
    {
      const type = types[i]
      items.push(
        <MenuItem key={i} value={ type.id }>{ type.name }</MenuItem>
      )
    }

    return items
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const url = process.env.REACT_APP_API + `/users/${auth.userID()}/vehicles/`;

    axios.post(url, {...this.state})
      .then((response) => {
        this.props.onSubmit()
      })
      .catch((error) => {
        console.log(error.response)
      })
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.appBarSpacer} />
        <Typography variant="h3" gutterBottom component="h2">
          Add Vehicle
        </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={16} direction="column">
            <Grid item>
              <TextField
                id="make"
                label="Make"
                className={classes.textField}
                value={this.state.make}
                onChange={this.handleChange('make')}
                margin="normal"
              />
              <TextField
                id="model"
                label="Model"
                className={classes.textField}
                value={this.state.model}
                onChange={this.handleChange('model')}
                margin="normal"
              />
              <TextField
                id="year"
                label="Year"
                className={classes.textField}
                value={this.state.year}
                onChange={this.handleChange('year')}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="state"
                label="State"
                className={classes.textField}
                value={this.state.state}
                onChange={this.handleChange('state')}
                margin="normal"
              />
              <TextField
                id="license"
                label="License"
                className={classes.textField}
                value={this.state.license}
                onChange={this.handleChange('license')}
                margin="normal"
              />
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

export default withStyles(styles)(VehicleForm);
