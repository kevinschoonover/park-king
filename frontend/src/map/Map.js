import React, { Component } from 'react'
import { Link } from "react-router-dom";

import axios from "axios";

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Fab from '@material-ui/core/Fab';

import { Map, TileLayer, Popup, Polygon } from 'react-leaflet'

const styles = theme => ({
  overlay: {
    position: "absolute",
    height: 300,
    width: 300,
    right: 0,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    zIndex: 1000,
    pointerEvents: "auto",
  },
  profile: {
    position: "absolute",
    right: 0,
    bottom: 0,
    marginRight: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    zIndex: 1000,
    pointerEvents: "auto",
    fontSize: 26,
  },
  header: {
    marginTop: theme.spacing.unit
  },
  lotLabel: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: 26,
    padding: 0
  },
  lotContainer: {},
  size: {},
	sizeIcon: {
		fontSize: 36,
	},
  popup: {
    width: 250,
    height: 125,
  }
})

const url = process.env.REACT_APP_API;

class FullMap extends Component {
  state = {
    lat: 37.954403,
    lng: -91.774891,
    zoom: 17,
    lots: [],
    show: {},
    busyness: {},
  }

  handleChange = name => event => {
    let state_copy = JSON.parse(JSON.stringify(this.state.show))
    state_copy[name] = event.target.checked
    this.setState({show: state_copy});
  };

  componentDidMount() {
    let lots = []
    let show = {};
    let busyness = {};

    axios.get(url + '/lots/')
    .then((response) => {
      lots = response.data

      lots.forEach((lot, index) => {
        axios.get(url + `/lots/${lot.id}/location`)
          .then((response) => {
            lot.position = response.data
            show[lot.name] = true
            return axios.get(url + `/lots/${lot.id}/busyness/`)
          })
          .then((response) => {
            busyness[lot.name] = response.data[0]
            this.setState({ show, lots, busyness });
          })
          .catch((error) => {
            console.log(error)
          })
      })
    })
    .catch((error) => {
      this.openSnack('Internal Server Error');
    });
  }

  renderPolygons() {
    const { classes } = this.props
    let polygons = []
    let count = 0

    for(let i=0; i < this.state.lots.length; i++) {
      const lot = this.state.lots[i]
      const availability = lot.capacity - this.state.busyness[lot.name]

      if (this.state.show[lot.name]) {
        for (let j=0; j < lot.position.length; j++) {
          polygons.push(
            <Polygon color="purple" positions={lot.position[j]} key={count}>
              <Popup>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  className={classes.popup}
                  spacing={16}
                >
                  <Grid container item direction="row" alignItems="flex-end">
                    <Grid item xs>
                    <Typography variant="h6">
                      Lot {lot.name}
                    </Typography>
                    </Grid>
                    <Grid item xs style={{textAlign: "right"}}>
                      <Typography variant="h6">
                        {availability}/{lot.capacity}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container justify="center" alignItems="center">
                    <Link to="/">
                      <Fab color="secondary" variant="extended" aria-label="Delete" >
                        Make a Reservation
                      </Fab>
                    </Link>
                  </Grid>
                </Grid>
              </Popup>
            </Polygon>
          )
          count += 1;
        }
      }
    }

    return polygons
  }

  renderLots() {
    const { classes } = this.props

    let lots = []
    for (let i=0; i < this.state.lots.length; i++) {
      const lot = this.state.lots[i]
      lots.push(
        <Grid
					container
					alignItems="center"
					spacing={8}
					className={classes.lotContainer}
					justify="space-between"
          key={i}
				>
          <Grid item>
            <Typography variant="subtitle1" className={classes.lotLabel}>
              Lot {lot.name}
            </Typography>
          </Grid>
          <Grid item>
						<Checkbox
              className={classes.size}
              icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />}
              checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
              value={lot.name}
              checked={!!this.state.show[lot.name]}
              onChange={this.handleChange(lot.name)}
						/>
          </Grid>
        </Grid>
      )
    }

    return lots
  }

  renderOverlay() {
    const { classes } = this.props

    return (
      <Card className={classes.overlay}>
        <Typography
          className={classes.header}
          gutterBottom
          variant="h4"
          align="center"
        >
          Lots
        </Typography>
        { this.renderLots() }
      </Card>
    )
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const { classes } = this.props

    return (
      <div style={{height: "100%", width: "100%"}}>
        {this.renderOverlay()}
        <Link to="/">
          <Fab color="secondary" variant="extended" aria-label="Delete" className={classes.profile}>
            Go To Profile
          </Fab>
        </Link>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.renderPolygons()}
        </Map>
      </div>
    )
  }
}

export default withStyles(styles)(FullMap)
